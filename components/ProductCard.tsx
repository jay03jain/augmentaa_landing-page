"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { trackEvent } from "@/lib/analytics";

const GlbViewer = dynamic(() => import("@/components/GlbViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-50 to-teal-50">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-teal-400 border-t-transparent" />
    </div>
  ),
});

export function ProductCard({
  name,
  image,
  specs,
  glb,
}: {
  name: string;
  image: string;
  specs: string[];
  glb?: string;
}) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      className="card-premium group flex h-full flex-col bg-white"
    >
      <span className="card-premium-topline" />

      {/* ── 3-D viewer when GLB is available ── */}
      {glb ? (
        <div className="relative h-[280px] w-full overflow-hidden rounded-t-2xl bg-gradient-to-br from-gray-50 to-[#E8F5F1]">
          <GlbViewer src={glb} className="h-full w-full" />
        </div>
      ) : (
        /* ── Tilt image fallback ── */
        <Tilt
          tiltMaxAngleX={12}
          tiltMaxAngleY={12}
          perspective={800}
          glareEnable
          glareMaxOpacity={0.08}
          glareColor="#00C9A7"
          glarePosition="all"
          scale={1.04}
          transitionSpeed={400}
          className="w-full"
        >
          <div className="relative flex min-h-[200px] w-full items-center justify-center bg-gradient-to-br from-gray-50 to-[#E8F5F1] px-4 py-6 transition-colors duration-300 group-hover:from-teal-50 group-hover:to-green-50">
            <div className="relative h-[240px] w-full max-w-[280px] sm:h-[280px]">
              <Image
                src={image}
                alt={name}
                fill
                className="object-contain"
                sizes="(max-width:768px) 100vw, 280px"
              />
            </div>
          </div>
        </Tilt>
      )}

      <div className="flex flex-1 flex-col p-6 pt-2">
        <h3 className="text-lg font-bold tracking-tight text-ink">{name}</h3>
        <ul className="mt-3 flex-1 space-y-2 text-sm leading-[1.75] text-gray-600">
          {specs.map((s) => (
            <li key={s} className="flex gap-2">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#00C9A7]" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
        <motion.div
          className="mt-6"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <a
            href="#enquiry"
            data-umami-event="request-quote"
            data-umami-event-product={name}
            onClick={() =>
              trackEvent("request_quote_click", { product: name })
            }
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#00C9A7] py-2.5 text-sm font-semibold text-white shadow-md shadow-teal-200/50 transition-colors hover:bg-[#00b396]"
          >
            Request quote
            <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-0.5">
              →
            </span>
          </a>
        </motion.div>
      </div>
    </motion.article>
  );
}
