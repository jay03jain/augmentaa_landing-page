"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { AdminStatsPayload } from "@/lib/db/stats";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export function AdminDashboard() {
  const router = useRouter();
  const [data, setData] = useState<AdminStatsPayload | null>(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/stats", { credentials: "include" });
        if (res.status === 401) {
          router.refresh();
          return;
        }
        if (!res.ok) {
          setErr("Could not load stats.");
          return;
        }
        const json = (await res.json()) as AdminStatsPayload;
        if (!cancelled) setData(json);
      } catch {
        if (!cancelled) setErr("Network error.");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  const chartData = useMemo(() => {
    if (!data) return [];
    return Object.entries(data.enquiryByProduct).map(([name, count]) => ({
      name,
      count,
    }));
  }, [data]);

  const topProduct = useMemo(() => {
    if (!data || !Object.keys(data.enquiryByProduct).length) return "—";
    let best = "";
    let n = 0;
    for (const [k, v] of Object.entries(data.enquiryByProduct)) {
      if (v > n) {
        n = v;
        best = k;
      }
    }
    return n ? `${best} (${n})` : "—";
  }, [data]);

  const umamiBase =
    typeof process.env.NEXT_PUBLIC_UMAMI_SRC === "string"
      ? process.env.NEXT_PUBLIC_UMAMI_SRC.replace(/\/script\.js\/?$/, "")
      : "";

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST", credentials: "include" });
    router.refresh();
  }

  if (err) {
    return <p className="p-8 font-mono text-sm text-red-600">{err}</p>;
  }

  if (!data) {
    return <p className="p-8 font-mono text-sm text-gray-600">Loading…</p>;
  }

  return (
    <div className="min-h-screen bg-white px-4 py-10 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-ink">Analytics summary</h1>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600">
              For full session analytics, visit your{" "}
              <a
                className="text-[#00C9A7] underline"
                href="https://analytics.google.com"
                target="_blank"
                rel="noreferrer"
              >
                GA4 dashboard
              </a>
              {umamiBase ? (
                <>
                  {" "}
                  and{" "}
                  <a
                    className="text-[#00C9A7] underline"
                    href={umamiBase}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Umami dashboard
                  </a>
                </>
              ) : null}
              .
            </p>
          </div>
          <button
            type="button"
            onClick={() => void logout()}
            className="rounded border border-gray-300 px-3 py-1.5 font-mono text-xs text-ink hover:bg-gray-50"
          >
            Log out
          </button>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            { label: "Total contacts", value: data.contactSubmissions },
            { label: "Total enquiries", value: data.enquirySubmissions },
            { label: "Most enquired product", value: topProduct, mono: true },
          ].map((c) => (
            <div
              key={c.label}
              className="rounded-lg border border-gray-200 bg-gray-50/80 p-4"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                {c.label}
              </p>
              <p
                className={`mt-2 text-2xl font-semibold text-ink ${
                  c.mono ? "break-words font-mono text-lg" : ""
                }`}
              >
                {c.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="text-lg font-semibold text-ink">
            Enquiries by product
          </h2>
          <div className="mt-4 h-72 w-full rounded border border-gray-200 p-2">
            {chartData.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  layout="vertical"
                  margin={{ left: 8, right: 16, top: 8, bottom: 8 }}
                >
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={160}
                    tick={{ fontSize: 11, fontFamily: "ui-monospace" }}
                  />
                  <Tooltip
                    contentStyle={{ fontFamily: "ui-monospace", fontSize: 12 }}
                  />
                  <Bar dataKey="count" fill="#00C9A7" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="p-4 font-mono text-sm text-gray-500">
                No enquiry data logged yet.
              </p>
            )}
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-lg font-semibold text-ink">Recent contacts</h2>
            <div className="mt-3 overflow-x-auto border border-gray-200">
              <table className="w-full min-w-[320px] border-collapse font-mono text-xs">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-left">
                    <th className="p-2">Name</th>
                    <th className="p-2">Email</th>
                    <th className="p-2">Subject</th>
                    <th className="p-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentContacts.length ? (
                    data.recentContacts.map((r, i) => (
                      <tr
                        key={`${r.email}-${r.submittedAt}-${r.subject}-${i}`}
                        className="border-b border-gray-100"
                      >
                        <td className="p-2">{r.name}</td>
                        <td className="p-2">{r.email}</td>
                        <td className="p-2">{r.subject}</td>
                        <td className="p-2 whitespace-nowrap">
                          {formatDate(r.submittedAt)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="p-4 text-gray-500" colSpan={4}>
                        No rows.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-ink">Recent enquiries</h2>
            <div className="mt-3 overflow-x-auto border border-gray-200">
              <table className="w-full min-w-[320px] border-collapse font-mono text-xs">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50 text-left">
                    <th className="p-2">Name</th>
                    <th className="p-2">Company</th>
                    <th className="p-2">Product</th>
                    <th className="p-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {data.recentEnquiries.length ? (
                    data.recentEnquiries.map((r, i) => (
                      <tr
                        key={`${r.email}-${r.submittedAt}-${r.product}-${i}`}
                        className="border-b border-gray-100"
                      >
                        <td className="p-2">{r.name}</td>
                        <td className="p-2">{r.company}</td>
                        <td className="p-2">{r.product}</td>
                        <td className="p-2 whitespace-nowrap">
                          {formatDate(r.submittedAt)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="p-4 text-gray-500" colSpan={4}>
                        No rows.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
