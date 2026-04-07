"use client";

import { useMDXComponent } from "next-contentlayer2/hooks";

export function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return (
    <div className="prose prose-neutral max-w-none prose-headings:font-extrabold prose-headings:tracking-tight prose-p:text-gray-600 prose-p:leading-[1.75] prose-a:text-brand prose-strong:text-ink">
      <Component />
    </div>
  );
}
