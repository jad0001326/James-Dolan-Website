import { z } from "zod";
import { buildContactEmail } from "@/lib/contact/email";
import { clientIp, rateLimit } from "@/lib/contact/rate-limit";
import { contactLimits, contactSchema, fieldErrorsFromIssues, submissionTiming } from "@/lib/contact/schema";
import { sendContactEmail, type MailClient } from "@/lib/contact/send";
import { verifyTurnstile } from "@/lib/contact/turnstile";

export type ContactResponse =
  | { ok: true; delivery: "sent" | "mock" | "received" }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

type HandlerDeps = {
  send?: typeof sendContactEmail;
  mailClient?: MailClient;
  now?: () => number;
};

function json(body: ContactResponse, status = 200, headers?: HeadersInit): Response {
  return Response.json(body, {
    status,
    headers: { "cache-control": "no-store", ...headers },
  });
}

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const host = request.headers.get("host");
  if (!host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function deliveryMode(): "mock" | "live" {
  if (process.env.CONTACT_DELIVERY === "mock" || !process.env.RESEND_API_KEY) return "mock";
  return "live";
}

function senderConfig(): { to: string; from: string } | null {
  const to = process.env.CONTACT_TO_EMAIL?.trim() ?? "";
  const from = process.env.CONTACT_FROM_EMAIL?.trim() ?? "";
  const fromEmail = from.match(/<([^>]+)>/)?.[1] ?? from;
  if (!z.email().safeParse(to).success || !z.email().safeParse(fromEmail).success) return null;
  return { to, from };
}

export async function handleContact(request: Request, deps: HandlerDeps = {}): Promise<Response> {
  if (request.method !== "POST") {
    return json({ ok: false, error: "Use the contact form to send a message." }, 405);
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return json({ ok: false, error: "The form could not be read. Reload the page and try again." }, 415);
  }

  const advertisedLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(advertisedLength) && advertisedLength > contactLimits.maxBodyBytes) {
    return json({ ok: false, error: "That message is too long." }, 413);
  }

  if (!sameOrigin(request)) {
    return json({ ok: false, error: "The form could not be sent from this page." }, 403);
  }

  const rawText = await request.text();
  if (rawText.length > contactLimits.maxBodyBytes) {
    return json({ ok: false, error: "That message is too long." }, 413);
  }

  let raw: unknown;
  try {
    raw = JSON.parse(rawText);
  } catch {
    return json({ ok: false, error: "The form could not be read. Reload the page and try again." }, 400);
  }

  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return json({ ok: false, error: "The form could not be read. Reload the page and try again." }, 400);
  }

  const limit = rateLimit(clientIp(request), deps.now?.());
  if (!limit.ok) {
    return json(
      { ok: false, error: "Too many messages from this network. Please wait a few minutes and try again." },
      429,
      { "retry-after": String(limit.retryAfter) },
    );
  }

  const honeypot = "hp_field" in raw ? raw.hp_field : "";
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return json({ ok: true, delivery: "received" });
  }
  if (honeypot !== "" && honeypot !== undefined) {
    return json({ ok: true, delivery: "received" });
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors = fieldErrorsFromIssues(parsed.error.issues);
    const error = Object.values(fieldErrors)[0] ?? "Check the form and try again.";
    return json({ ok: false, error, fieldErrors }, 400);
  }

  const timing = submissionTiming(parsed.data.startedAt, deps.now?.() ?? Date.now());
  if (timing === "too-fast") {
    return json({ ok: false, error: "Please wait a moment and send the form again." }, 400);
  }
  if (timing === "stale") {
    return json({ ok: false, error: "This form has expired. Reload the page and try again." }, 400);
  }

  const human = await verifyTurnstile(parsed.data.turnstileToken, clientIp(request));
  if (!human) {
    return json({ ok: false, error: "The spam check failed. Please try again." }, 400);
  }

  if (deliveryMode() === "mock") {
    return json({ ok: true, delivery: "mock" });
  }

  const config = senderConfig();
  if (!config) {
    console.error("Contact form is missing CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL.");
    return json({ ok: false, error: "The contact form is not configured yet. Please use LinkedIn instead." }, 500);
  }

  try {
    const email = buildContactEmail(parsed.data, config.to, config.from);
    const send = deps.send ?? sendContactEmail;
    await send(email, deps.mailClient ? { client: deps.mailClient } : {});
    return json({ ok: true, delivery: "sent" });
  } catch {
    return json({ ok: false, error: "The message could not be sent. Please try again, or use LinkedIn." }, 502);
  }
}
