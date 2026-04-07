"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      subject: String(fd.get("subject") || ""),
      message: String(fd.get("message") || ""),
    };
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { success?: boolean; error?: string };
      if (!res.ok || !data.success) {
        setStatus("err");
        setMessage(data.error || "Something went wrong.");
        return;
      }
      trackEvent("contact_form_submit", { form: "contact" });
      setStatus("ok");
      e.currentTarget.reset();
    } catch {
      setStatus("err");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink">
          Name
          <input
            name="name"
            required
            className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2.5 text-sm text-gray-600 outline-none ring-brand/30 transition focus:ring-2"
            placeholder="Your name"
          />
        </label>
        <label className="block text-sm font-medium text-ink">
          Email
          <input
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2.5 text-sm text-gray-600 outline-none ring-brand/30 transition focus:ring-2"
            placeholder="you@company.com"
          />
        </label>
      </div>
      <label className="block text-sm font-medium text-ink">
        Subject
        <input
          name="subject"
          required
          className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2.5 text-sm text-gray-600 outline-none ring-brand/30 transition focus:ring-2"
          placeholder="How can we help?"
        />
      </label>
      <label className="block text-sm font-medium text-ink">
        Message
        <textarea
          name="message"
          required
          rows={5}
          className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2.5 text-sm text-gray-600 outline-none ring-brand/30 transition focus:ring-2"
          placeholder="Tell us about your project or fleet size…"
        />
      </label>
      {status === "ok" ? (
        <p className="text-sm font-medium text-brand">
          Your message has been sent. Thank you!
        </p>
      ) : null}
      {status === "err" ? (
        <p className="text-sm font-medium text-red-600">{message}</p>
      ) : null}
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <button
          type="submit"
          disabled={status === "loading"}
          data-umami-event="contact-form-submit"
          className="inline-flex w-full items-center justify-center rounded-full bg-[#00C9A7] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-teal-200/50 transition-opacity hover:bg-[#00b396] disabled:opacity-60 sm:w-auto"
        >
          {status === "loading" ? "Sending…" : "Send message"}
        </button>
      </motion.div>
    </form>
  );
}
