import assert from "node:assert/strict";
import { afterEach, beforeEach, test } from "node:test";
import { buildContactEmail, contactIdempotencyKey } from "../lib/contact/email";
import { handleContact } from "../lib/contact/handle";
import { rateLimit, resetRateLimit } from "../lib/contact/rate-limit";
import { contactSchema, submissionTiming } from "../lib/contact/schema";
import { sendContactEmail, type MailClient } from "../lib/contact/send";

const envKeys = ["RESEND_API_KEY", "CONTACT_TO_EMAIL", "CONTACT_FROM_EMAIL", "CONTACT_DELIVERY", "TURNSTILE_SECRET_KEY"] as const;
let envSnapshot: Record<string, string | undefined> = {};

beforeEach(() => {
  envSnapshot = Object.fromEntries(envKeys.map((key) => [key, process.env[key]]));
  for (const key of envKeys) delete process.env[key];
  resetRateLimit();
});

afterEach(() => {
  for (const key of envKeys) {
    const value = envSnapshot[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  resetRateLimit();
});

function validBody(overrides: Record<string, unknown> = {}) {
  return {
    name: "Ada Lovelace",
    email: "ada@example.com",
    message: "Hello from the test suite, this is long enough.",
    startedAt: Date.now() - 5000,
    submissionId: crypto.randomUUID(),
    ...overrides,
  };
}

function post(body: unknown, headers: Record<string, string> = {}) {
  return handleContact(
    new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        host: "localhost:3000",
        origin: "http://localhost:3000",
        "x-forwarded-for": `203.0.113.${Math.floor(Math.random() * 200) + 1}`,
        ...headers,
      },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
  );
}

test("schema accepts a normal message and rejects a short one", () => {
  assert.equal(contactSchema.safeParse(validBody()).success, true);
  const rejected = contactSchema.safeParse(validBody({ message: "too short" }));
  assert.equal(rejected.success, false);
});

test("timing rejects instant submits and stale forms", () => {
  const now = 1_000_000;
  assert.equal(submissionTiming(now - 500, now), "too-fast");
  assert.equal(submissionTiming(now - 10_000, now), "ok");
  assert.equal(submissionTiming(now - 1000 * 60 * 60 * 49, now), "stale");
  assert.equal(submissionTiming(now + 1000 * 60 * 30, now), "ok");
});

test("rate limit blocks the sixth attempt in a window", () => {
  for (let attempt = 0; attempt < 5; attempt += 1) {
    assert.equal(rateLimit("198.51.100.8", 1_000).ok, true);
  }
  const blocked = rateLimit("198.51.100.8", 1_000);
  assert.equal(blocked.ok, false);
  if (!blocked.ok) assert.ok(blocked.retryAfter > 0);
});

test("email escapes html and keeps a stable idempotency key", () => {
  const parsed = contactSchema.parse(validBody({ name: "Ada <script>", message: "Line one\n<script>alert(1)</script> and more text" }));
  const email = buildContactEmail(parsed, "james@example.com", "James Dolan <website@jamesdolan.info>");
  assert.equal(email.idempotencyKey, contactIdempotencyKey(parsed.submissionId));
  assert.equal(email.replyTo, "ada@example.com");
  assert.match(email.html, /&lt;script&gt;/);
  assert.doesNotMatch(email.html, /<script>alert/);
  assert.match(email.text, /<script>alert/);
  assert.match(email.html, /lang="en"/);
});

test("mock mode accepts a valid form and does not call the mailer", async () => {
  let called = false;
  const response = await handleContact(
    new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        host: "localhost:3000",
        origin: "http://localhost:3000",
        "x-forwarded-for": "203.0.113.50",
      },
      body: JSON.stringify(validBody()),
    }),
    {
      send: async () => {
        called = true;
        return { id: "should-not-send" };
      },
    },
  );
  assert.equal(response.status, 200);
  const payload = await response.json();
  assert.deepEqual(payload, { ok: true, delivery: "mock" });
  assert.equal(called, false);
});

test("honeypot returns success without sending", async () => {
  let called = false;
  const response = await post(validBody({ hp_field: "https://spam.example" }), { "x-forwarded-for": "203.0.113.60" });
  assert.equal(called, false);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, delivery: "received" });
});

test("invalid email returns a field error", async () => {
  const response = await post(validBody({ email: "not-an-email" }), { "x-forwarded-for": "203.0.113.61" });
  assert.equal(response.status, 400);
  const payload = await response.json();
  assert.equal(payload.ok, false);
  assert.equal(payload.fieldErrors.email, "Enter a valid email address.");
});

test("a too-fast submit is rejected", async () => {
  const response = await post(validBody({ startedAt: Date.now() }), { "x-forwarded-for": "203.0.113.62" });
  assert.equal(response.status, 400);
});

test("a foreign origin is rejected", async () => {
  const response = await post(validBody(), {
    "x-forwarded-for": "203.0.113.63",
    origin: "https://evil.example",
    host: "localhost:3000",
  });
  assert.equal(response.status, 403);
});

test("live delivery uses the injected mailer once", async () => {
  process.env.RESEND_API_KEY = "re_test_key";
  process.env.CONTACT_TO_EMAIL = "james@example.com";
  process.env.CONTACT_FROM_EMAIL = "James Dolan <website@jamesdolan.info>";
  let received: { replyTo?: string; idempotencyKey?: string } | undefined;
  const response = await handleContact(
    new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        host: "localhost:3000",
        origin: "http://localhost:3000",
        "x-forwarded-for": "203.0.113.70",
      },
      body: JSON.stringify(validBody()),
    }),
    {
      send: async (email) => {
        received = { replyTo: email.replyTo, idempotencyKey: email.idempotencyKey };
        return { id: "email_123" };
      },
    },
  );
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, delivery: "sent" });
  assert.equal(received?.replyTo, "ada@example.com");
  assert.match(received?.idempotencyKey ?? "", /^contact\//);
});

test("mailer retries a 500 and keeps the same idempotency key", async () => {
  const keys: Array<string | undefined> = [];
  const client: MailClient = {
    emails: {
      send: async (_payload, options) => {
        keys.push(options.idempotencyKey);
        if (keys.length === 1) {
          return { data: null, error: { message: "down", statusCode: 500, name: "internal_server_error" } };
        }
        return { data: { id: "email_retry" }, error: null };
      },
    },
  };
  const email = buildContactEmail(
    contactSchema.parse(validBody()),
    "james@example.com",
    "James Dolan <website@jamesdolan.info>",
  );
  const result = await sendContactEmail(email, { client, wait: async () => undefined });
  assert.equal(result.id, "email_retry");
  assert.deepEqual(keys, [email.idempotencyKey, email.idempotencyKey]);
});

test("rate limit response uses 429", async () => {
  const ip = "203.0.113.80";
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const response = await post(validBody(), { "x-forwarded-for": ip });
    assert.equal(response.status, 200);
  }
  const blocked = await post(validBody(), { "x-forwarded-for": ip });
  assert.equal(blocked.status, 429);
  assert.ok(blocked.headers.get("retry-after"));
});
