"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AdminLoginGate() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setErr(data.error || "Login failed.");
        return;
      }
      setUsername("");
      setPassword("");
      router.refresh();
    } catch {
      setErr("Network error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-md flex-col justify-center px-4 py-16">
      <h1 className="text-2xl font-bold text-ink">Admin</h1>
      <p className="mt-2 text-sm text-gray-600">
        Enter your admin username and password to view submission analytics.
      </p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <label className="block text-sm font-medium text-ink">
          Username
          <input
            type="text"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 font-mono text-sm outline-none focus:ring-2 focus:ring-brand/40"
            placeholder="admin"
            required
          />
        </label>
        <label className="block text-sm font-medium text-ink">
          Password
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 font-mono text-sm outline-none focus:ring-2 focus:ring-brand/40"
            required
          />
        </label>
        {err ? <p className="text-sm text-red-600">{err}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-ink px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
