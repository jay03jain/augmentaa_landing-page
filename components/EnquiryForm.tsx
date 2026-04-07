"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { productOptions } from "@/lib/products";
import { trackEvent } from "@/lib/analytics";

export function EnquiryForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      company: String(fd.get("company") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      product: String(fd.get("product") || ""),
      message: String(fd.get("message") || ""),
    };
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/enquiry", {
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
      trackEvent("enquiry_form_submit", { product: payload.product });
      setStatus("ok");
      e.currentTarget.reset();
    } catch {
      setStatus("err");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" id="enquiry">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink">
          Name
          <input
            name="name"
            required
            className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2.5 text-sm text-gray-600 outline-none ring-brand/30 transition focus:ring-2"
          />
        </label>
        <label className="block text-sm font-medium text-ink">
          Company name
          <input
            name="company"
            required
            className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2.5 text-sm text-gray-600 outline-none ring-brand/30 transition focus:ring-2"
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink">
          Email
          <input
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2.5 text-sm text-gray-600 outline-none ring-brand/30 transition focus:ring-2"
          />
        </label>
        <label className="block text-sm font-medium text-ink">
          Phone
          <input
            name="phone"
            type="tel"
            required
            className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2.5 text-sm text-gray-600 outline-none ring-brand/30 transition focus:ring-2"
          />
        </label>
      </div>
      <label className="block text-sm font-medium text-ink">
        Product of interest
        <select
          name="product"
          required
          className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2.5 text-sm text-gray-600 outline-none ring-brand/30 transition focus:ring-2"
          defaultValue=""
        >
          <option value="" disabled>
            Select a product
          </option>
          {productOptions.map((p) => (
            <option key={p.value} value={p.label}>
              {p.label}
            </option>
          ))}
        </select>
      </label>
      <label className="block text-sm font-medium text-ink">
        Message
        <textarea
          name="message"
          required
          rows={4}
          className="mt-1 w-full rounded-lg border border-black/10 bg-white px-3 py-2.5 text-sm text-gray-600 outline-none ring-brand/30 transition focus:ring-2"
        />
      </label>
      {status === "ok" ? (
        <p className="text-sm font-medium text-brand">
          Thank you — we&apos;ll get back to you shortly.
        </p>
      ) : null}
      {status === "err" ? (
        <p className="text-sm font-medium text-red-600">{message}</p>
      ) : null}
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <button
          type="submit"
          disabled={status === "loading"}
          data-umami-event="enquiry-form-submit"
          className="inline-flex w-full items-center justify-center rounded-full bg-[#00C9A7] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-teal-200/50 transition-opacity hover:bg-[#00b396] disabled:opacity-60 sm:w-auto"
        >
          {status === "loading" ? "Submitting…" : "Submit enquiry"}
        </button>
      </motion.div>
    </form>
  );
}
