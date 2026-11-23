import { Resend } from "resend";
import type { ContactEmail } from "@/lib/contact/email";

export type MailError = { message: string; statusCode: number | null; name: string };

export type MailClient = {
  emails: {
    send: (
      payload: {
        from: string;
        to: string[];
        subject: string;
        html: string;
        text: string;
        replyTo: string;
        tags: { name: string; value: string }[];
      },
      options: { idempotencyKey?: string },
    ) => Promise<{ data: { id: string } | null; error: MailError | null }>;
  };
};

const retryable = new Set([429, 500]);

function defaultWait(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function sendContactEmail(
  email: ContactEmail,
  deps: { client?: MailClient; wait?: (ms: number) => Promise<void> } = {},
): Promise<{ id: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!deps.client && !apiKey) {
    throw new Error("RESEND_API_KEY is not set");
  }

  const client = deps.client ?? new Resend(apiKey);
  const wait = deps.wait ?? defaultWait;
  const payload = {
    from: email.from,
    to: [email.to],
    subject: email.subject,
    html: email.html,
    text: email.text,
    replyTo: email.replyTo,
    tags: [{ name: "category", value: "contact" }],
  };

  const sendOnce = () => client.emails.send(payload, { idempotencyKey: email.idempotencyKey });

  let result = await sendOnce();
  if (result.error && result.error.statusCode !== null && retryable.has(result.error.statusCode)) {
    await wait(400);
    result = await sendOnce();
  }

  if (result.error || !result.data) {
    const status = result.error?.statusCode ?? "unknown";
    const name = result.error?.name ?? "send_failed";
    console.error(`Contact email failed: ${name} (${status})`);
    throw new Error("Email delivery failed");
  }

  return { id: result.data.id };
}
