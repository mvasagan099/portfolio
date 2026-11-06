"use client";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowUpRight, LoaderCircle, CheckCircle2 } from "lucide-react";
import { contactFormSchema, type ContactValues } from "@/lib/contact";
function requestId() {
  const b = new Uint8Array(16);
  crypto.getRandomValues(b);
  b[6] = (b[6] & 15) | 64;
  b[8] = (b[8] & 63) | 128;
  const h = [...b].map((n) => n.toString(16).padStart(2, "0")).join("");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}
export default function ContactForm() {
  const [success, setSuccess] = useState(false);
  const submission = useRef<{ signature: string; id: string } | null>(null);
  const busy = useRef(false);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<ContactValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      website: "",
      consent: false
    }
  });
  const send = async (values: ContactValues) => {
    if (busy.current) return;
    busy.current = true;
    setSuccess(false);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
      const signature = JSON.stringify(values);
      if (submission.current?.signature !== signature)
        submission.current = { signature, id: requestId() };
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, clientId: submission.current.id }),
        signal: controller.signal
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok || body.ok !== true) {
        if (body.fieldErrors) {
          for (const key of [
            "name",
            "email",
            "subject",
            "message",
            "consent"
          ] as const) {
            const value = body.fieldErrors[key];
            if (Array.isArray(value) && value[0])
              setError(key, { message: value[0] });
          }
        }
        throw new Error(
          body.error ||
            "Your message could not be saved. Please use the email link."
        );
      }
      setSuccess(true);
      reset();
      submission.current = null;
    } catch (error) {
      setError("root.server", {
        message:
          error instanceof Error && error.name !== "AbortError"
            ? error.message
            : "The request timed out. Please try again or use the email link."
      });
    } finally {
      clearTimeout(timeout);
      busy.current = false;
    }
  };
  const inputClass =
    "mt-2 min-h-11 w-full rounded-lg border border-border bg-background/70 px-3 py-2.5 text-sm text-foreground placeholder:text-muted/60 focus:border-accent disabled:opacity-60";
  return (
    <form
      onSubmit={handleSubmit(send)}
      noValidate
      aria-label="Contact form"
      className="rounded-2xl border border-border bg-background/30 p-5 sm:p-7"
    >
      <h3 className="text-lg font-medium">Send an enquiry</h3>
      <p className="mt-2 text-xs leading-6 text-muted">
        Your details are used to respond to this message. All fields are
        required.
      </p>
      <fieldset disabled={isSubmitting} className="mt-5 space-y-5">
        <legend className="sr-only">Contact details and message</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className="text-sm">
              Name
            </label>
            <input
              id="contact-name"
              autoComplete="name"
              maxLength={80}
              className={inputClass}
              {...register("name")}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
            />
            {errors.name && (
              <p id="contact-name-error" className="mt-2 text-xs text-red-300">
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="contact-email" className="text-sm">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              autoComplete="email"
              maxLength={254}
              className={inputClass}
              {...register("email")}
              aria-invalid={!!errors.email}
              aria-describedby={
                errors.email ? "contact-email-error" : undefined
              }
            />
            {errors.email && (
              <p id="contact-email-error" className="mt-2 text-xs text-red-300">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="contact-subject" className="text-sm">
            Subject
          </label>
          <input
            id="contact-subject"
            maxLength={120}
            className={inputClass}
            {...register("subject")}
            aria-invalid={!!errors.subject}
            aria-describedby={
              errors.subject ? "contact-subject-error" : undefined
            }
          />
          {errors.subject && (
            <p id="contact-subject-error" className="mt-2 text-xs text-red-300">
              {errors.subject.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="contact-message" className="text-sm">
            Message
          </label>
          <textarea
            id="contact-message"
            rows={5}
            maxLength={4000}
            className={`${inputClass} resize-y`}
            {...register("message")}
            aria-invalid={!!errors.message}
            aria-describedby="contact-message-help contact-message-error"
          />
          <p id="contact-message-help" className="mt-1 text-[11px] text-muted">
            20–4,000 characters. Please avoid passwords and sensitive account
            information.
          </p>
          <p id="contact-message-error" className="mt-2 text-xs text-red-300">
            {errors.message?.message}
          </p>
        </div>
        <div hidden aria-hidden="true">
          <label htmlFor="contact-website">Website</label>
          <input
            id="contact-website"
            tabIndex={-1}
            autoComplete="off"
            {...register("website")}
          />
        </div>
        <div>
          <label className="flex cursor-pointer items-start gap-3 text-xs leading-6 text-muted">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4 shrink-0 accent-accent"
              {...register("consent")}
              aria-invalid={!!errors.consent}
              aria-describedby={
                errors.consent ? "contact-consent-error" : undefined
              }
            />
            <span>
              I agree to my name, email, and message being stored to respond to
              this enquiry.
            </span>
          </label>
          {errors.consent && (
            <p id="contact-consent-error" className="mt-2 text-xs text-red-300">
              {errors.consent.message}
            </p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-accentStrong disabled:cursor-wait disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <LoaderCircle size={16} className="animate-spin" aria-hidden />
              Saving message…
            </>
          ) : (
            <>
              Send message
              <ArrowUpRight size={16} aria-hidden />
            </>
          )}
        </button>
      </fieldset>
      {errors.root?.server && (
        <p role="alert" className="mt-5 text-sm leading-6 text-red-300">
          {errors.root.server.message}
        </p>
      )}
      {success && (
        <div
          role="status"
          className="mt-5 flex gap-3 rounded-lg border border-accent/25 bg-accent/5 p-4 text-sm leading-6 text-accent"
        >
          <CheckCircle2 size={19} className="mt-0.5 shrink-0" aria-hidden />
          <p>Your message has been received. Thank you for getting in touch.</p>
        </div>
      )}
    </form>
  );
}
