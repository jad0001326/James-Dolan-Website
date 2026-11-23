"use client";

import { useCallback, useId, useRef, useState, type FormEvent } from "react";
import { TurnstileWidget } from "@/components/turnstile-widget";
import type { FieldErrors } from "@/lib/contact/schema";
import { site } from "@/lib/site";

type Status = "idle" | "submitting" | "sent" | "mock" | "error";

type ApiResult = {
  ok: boolean;
  delivery?: "sent" | "mock" | "received";
  error?: string;
  fieldErrors?: FieldErrors;
};

const fieldClass =
  "mt-2 w-full rounded-2xl border border-line bg-bg px-3 py-3 text-base text-ink";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [turnstileToken, setTurnstileToken] = useState("");
  const formId = useId();
  const summaryId = useId();
  const startedAt = useRef("");
  const onToken = useCallback((token: string) => setTurnstileToken(token), []);

  function stampStartedAt(node: HTMLInputElement | null) {
    if (node && node.value === "") {
      const stamped = String(Date.now());
      node.value = stamped;
      startedAt.current = stamped;
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const submittedAt = Number(data.get("startedAt") || startedAt.current);
    setStatus("submitting");
    setError("");
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json", accept: "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          hp_field: data.get("hp_field"),
          startedAt: Number.isFinite(submittedAt) ? submittedAt : 0,
          submissionId: crypto.randomUUID(),
          turnstileToken: turnstileToken || undefined,
        }),
      });
      const payload = (await response.json()) as ApiResult;
      if (!response.ok || !payload.ok) {
        setStatus("error");
        setError(payload.error ?? "The message could not be sent. Please try again.");
        setFieldErrors(payload.fieldErrors ?? {});
        return;
      }
      form.reset();
      const stamped = String(Date.now());
      startedAt.current = stamped;
      const hidden = form.querySelector<HTMLInputElement>("input[name='startedAt']");
      if (hidden) hidden.value = stamped;
      setStatus(payload.delivery === "mock" ? "mock" : "sent");
    } catch {
      setStatus("error");
      setError("The message could not be sent. Check your connection and try again.");
    }
  }

  if (status === "sent" || status === "mock") {
    return (
      <div role="status" className="rounded-3xl border border-line bg-bg-elev p-6">
        <h2 className="font-serif text-3xl text-ink">{status === "mock" ? "Validated in demo mode" : "Message sent"}</h2>
        <p className="mt-3 text-muted">
          {status === "mock"
            ? "The form passed the server checks, but email delivery is not configured in this environment, so nothing was sent."
            : "James has the message and can reply by email."}
        </p>
        <button type="button" className="mt-6 inline-flex min-h-11 items-center rounded-full border border-line px-4 font-semibold text-ink" onClick={() => setStatus("idle")}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate={false} className="rounded-3xl border border-line bg-bg-elev p-6" aria-describedby={error ? summaryId : undefined}>
      {error ? (
        <div id={summaryId} role="alert" className="mb-5 rounded-2xl border border-danger px-4 py-3 text-sm text-danger">
          {error}
        </div>
      ) : null}

      <input ref={stampStartedAt} type="hidden" name="startedAt" defaultValue="" />

      <div className="hp-field" aria-hidden="true">
        <label htmlFor={`${formId}-hp`}>Leave this field empty</label>
        <input id={`${formId}-hp`} name="hp_field" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div>
        <label htmlFor={`${formId}-name`} className="font-semibold text-ink">
          Name
        </label>
        <input
          id={`${formId}-name`}
          name="name"
          type="text"
          required
          minLength={2}
          maxLength={80}
          autoComplete="name"
          aria-invalid={fieldErrors.name ? true : undefined}
          aria-describedby={fieldErrors.name ? `${formId}-name-error` : undefined}
          className={fieldClass}
        />
        {fieldErrors.name ? (
          <p id={`${formId}-name-error`} className="mt-2 text-sm text-danger">
            {fieldErrors.name}
          </p>
        ) : null}
      </div>

      <div className="mt-4">
        <label htmlFor={`${formId}-email`} className="font-semibold text-ink">
          Email
        </label>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          required
          maxLength={120}
          autoComplete="email"
          aria-invalid={fieldErrors.email ? true : undefined}
          aria-describedby={fieldErrors.email ? `${formId}-email-error` : undefined}
          className={fieldClass}
        />
        {fieldErrors.email ? (
          <p id={`${formId}-email-error`} className="mt-2 text-sm text-danger">
            {fieldErrors.email}
          </p>
        ) : null}
      </div>

      <div className="mt-4">
        <label htmlFor={`${formId}-message`} className="font-semibold text-ink">
          Message
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          required
          minLength={10}
          maxLength={4000}
          rows={7}
          aria-invalid={fieldErrors.message ? true : undefined}
          aria-describedby={fieldErrors.message ? `${formId}-message-error` : undefined}
          className={fieldClass}
        />
        {fieldErrors.message ? (
          <p id={`${formId}-message-error`} className="mt-2 text-sm text-danger">
            {fieldErrors.message}
          </p>
        ) : null}
      </div>

      <TurnstileWidget onToken={onToken} />

      <p className="mt-4 text-sm text-muted">{site.emailNote}</p>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-5 inline-flex min-h-11 items-center rounded-full bg-accent px-5 font-semibold text-accent-ink disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
