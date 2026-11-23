import { z } from "zod";

export const contactLimits = {
  nameMin: 2,
  nameMax: 80,
  messageMin: 10,
  messageMax: 4000,
  minimumAgeMs: 2000,
  maximumAgeMs: 1000 * 60 * 60 * 48,
  clockSkewMs: 1000 * 60 * 5,
  maxBodyBytes: 20_000,
  rateLimit: 5,
  rateWindowMs: 1000 * 60 * 10,
} as const;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(contactLimits.nameMin, "Enter your name.")
    .max(contactLimits.nameMax, "Name is too long."),
  email: z.email("Enter a valid email address."),
  message: z
    .string()
    .trim()
    .min(contactLimits.messageMin, "Message should be at least 10 characters.")
    .max(contactLimits.messageMax, "Message is too long."),
  startedAt: z.number().int("The form could not be checked. Reload the page and try again."),
  submissionId: z.uuid("The form could not be checked. Reload the page and try again."),
  turnstileToken: z.string().trim().max(2048).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type FieldName = "name" | "email" | "message";

export type FieldErrors = Partial<Record<FieldName, string>>;

export function fieldErrorsFromIssues(issues: { path: PropertyKey[]; message: string }[]): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of issues) {
    const key = issue.path[0];
    if ((key === "name" || key === "email" || key === "message") && !errors[key]) {
      errors[key] = issue.message;
    }
  }
  return errors;
}

export type TimingResult = "ok" | "too-fast" | "stale";

export function submissionTiming(startedAt: number, now = Date.now()): TimingResult {
  if (startedAt > now + contactLimits.clockSkewMs) return "ok";
  const age = now - startedAt;
  if (age > contactLimits.maximumAgeMs) return "stale";
  if (age < contactLimits.minimumAgeMs) return "too-fast";
  return "ok";
}
