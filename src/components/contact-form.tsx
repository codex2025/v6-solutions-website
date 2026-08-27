"use client";

import { useState, type FormEvent } from "react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-border-soft bg-surface p-6 text-sm text-fg-muted">
        Thanks for writing it up. Submission isn&apos;t wired to an inbox yet — we&apos;re
        finishing setup on a business email address. Nothing you entered was sent anywhere.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="font-mono text-xs tracking-wider text-fg-dim">
          NAME
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="mt-2 w-full rounded-xl border border-border bg-bg-raised px-4 py-3 text-sm text-fg outline-none placeholder:text-fg-dim focus:border-accent-blue"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="email" className="font-mono text-xs tracking-wider text-fg-dim">
          EMAIL
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="mt-2 w-full rounded-xl border border-border bg-bg-raised px-4 py-3 text-sm text-fg outline-none placeholder:text-fg-dim focus:border-accent-blue"
          placeholder="you@company.com"
        />
      </div>

      <div>
        <label htmlFor="details" className="font-mono text-xs tracking-wider text-fg-dim">
          WHAT ARE YOU BUILDING?
        </label>
        <textarea
          id="details"
          name="details"
          required
          rows={5}
          className="mt-2 w-full resize-none rounded-xl border border-border bg-bg-raised px-4 py-3 text-sm text-fg outline-none placeholder:text-fg-dim focus:border-accent-blue"
          placeholder="Tell us what it is, roughly where you are with it, and what you need."
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full bg-accent-blue px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Send
      </button>

      <p className="text-xs text-fg-dim">
        Contact details are coming shortly — we&apos;re finishing setup on a business email
        address, so this form isn&apos;t connected to an inbox yet.
      </p>
    </form>
  );
}
