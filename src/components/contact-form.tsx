"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { site } from "@/lib/site";
import { Button } from "./ui";

const fieldClasses =
  "w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const labelClasses = "block text-sm font-medium text-foreground";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = encodeURIComponent(`Message from ${name || "the website"}`);
    const body = encodeURIComponent(
      `${message}\n\n— ${name || "Anonymous"}${email ? ` (${email})` : ""}`,
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label htmlFor="name" className={labelClasses}>
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
            className={fieldClasses}
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="email" className={labelClasses}>
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className={fieldClasses}
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <label htmlFor="message" className={labelClasses}>
          Message
        </label>
        <textarea
          id="message"
          required
          rows={6}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="How can I help?"
          className={fieldClasses}
        />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button type="submit">
          <Send size={16} />
          Send message
        </Button>
        <p className="text-xs text-muted-foreground">
          Opens your email app, pre-filled and ready to send.
        </p>
      </div>
    </form>
  );
}
