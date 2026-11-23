import type { ContactInput } from "@/lib/contact/schema";
import { escapeHtml, singleLine } from "@/lib/utils";

export type ContactEmail = {
  subject: string;
  html: string;
  text: string;
  replyTo: string;
  to: string;
  from: string;
  submissionId: string;
  idempotencyKey: string;
};

export function contactIdempotencyKey(submissionId: string): string {
  return `contact/${submissionId}`;
}

export function buildContactEmail(input: ContactInput, to: string, from: string): ContactEmail {
  const name = singleLine(input.name);
  const email = singleLine(input.email);
  const message = input.message.trim();
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br>");

  const text = [
    "New message from the jamesdolan.info contact form.",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    "",
    "Message:",
    message,
    "",
    "Reply to this email to respond directly. The address was submitted through the website contact form and has not been added to a mailing list.",
  ].join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Website message from ${safeName}</title>
</head>
<body style="margin:0;background:#f3f1ea;color:#1a1f16;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">New enquiry from the jamesdolan.info contact form.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f1ea;">
    <tr>
      <td align="center" style="padding:24px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fffcf7;border:1px solid #d9d3c5;">
          <tr>
            <td style="padding:28px;font-family:Georgia,'Times New Roman',serif;">
              <p style="margin:0 0 8px;font-family:ui-monospace,monospace;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#3e493c;">jamesdolan.info</p>
              <h1 style="margin:0 0 16px;font-size:24px;line-height:1.3;color:#1a1f16;">New message from ${safeName}</h1>
              <p style="margin:0 0 8px;font-size:16px;line-height:1.5;color:#1a1f16;"><strong>Email</strong><br><a href="mailto:${safeEmail}" style="color:#2f4a0e;">${safeEmail}</a></p>
              <h2 style="margin:24px 0 8px;font-size:18px;line-height:1.4;color:#1a1f16;">Message</h2>
              <p style="margin:0;font-size:16px;line-height:1.6;color:#1a1f16;">${safeMessage}</p>
            </td>
          </tr>
        </table>
        <p style="max-width:560px;font-family:Georgia,'Times New Roman',serif;font-size:14px;line-height:1.5;color:#3e493c;">Reply to this email to respond directly. The address was submitted through the website contact form and has not been added to a mailing list.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;

  return {
    subject: `Website message from ${name}`,
    html,
    text,
    replyTo: email,
    to,
    from,
    submissionId: input.submissionId,
    idempotencyKey: contactIdempotencyKey(input.submissionId),
  };
}
