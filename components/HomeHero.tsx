"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { HeroParticles } from "@/components/HeroParticles";
import { trackEvent } from "@/lib/analytics";

function HeroBolt() {
  return (
    <svg
      className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 text-[#00C9A7] opacity-[0.06]"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z" />
    </svg>
  );
}

function HeroStatStrip() {
  return (
    <motion.p
      className="mt-auto flex flex-wrap items-center justify-center gap-x-2 gap-y-1 border-t border-black/5 px-4 py-3 text-xs text-gray-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      <span className="font-medium tabular-nums">2.2M+ km</span>
      <span className="text-black/20">·</span>
      <span className="font-medium tabular-nums">21K+ vehicles</span>
      <span className="text-black/20">·</span>
      <span className="font-medium tabular-nums">546T CO₂ saved</span>
    </motion.p>
  );
}

export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 280], [1, 0]);
  const y = useTransform(scrollY, [0, 280], [0, -24]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] overflow-hidden bg-white pt-16"
    >
      <div className="mx-auto grid min-h-[calc(100dvh-4rem)] max-w-6xl grid-cols-1 items-center gap-10 px-4 py-12 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <motion.div style={{ opacity, y }} className="max-w-xl">
          <p className="section-overline">Augmentaa Digital</p>
          <h1 className="mt-4 text-balance text-4xl font-black tracking-tighter leading-none text-ink sm:text-5xl lg:text-7xl">
            Powering India&apos;s
            <br />
            Electric Future
          </h1>
          <p className="mt-6 max-w-md text-xl leading-relaxed text-gray-500">
            AC/DC charging hardware, charging and fleet software (SPARK EV, SPARK
            DRIVE, BATTERY PULSE), and intracity EV logistics — built for Indian
            B2B operators who need reliability at scale.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "⚡ OCPP 2.0",
              "🌱 Carbon Neutral Goal",
              "📍 Pan-India",
            ].map((label) => (
              <span
                key={label}
                className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
              >
                {label}
              </span>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/products"
                data-umami-event="hero-explore-products"
                onClick={() =>
                  trackEvent("hero_cta_click", { cta: "explore_products" })
                }
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#00C9A7] px-7 py-3 text-sm font-semibold text-white shadow-md shadow-teal-200/50 transition-colors hover:bg-[#00b396]"
              >
                Explore products
                <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact"
                data-umami-event="hero-contact"
                className="inline-flex items-center justify-center rounded-full border-2 border-gray-900 px-7 py-3 text-sm font-semibold text-gray-900 transition-colors duration-200 hover:bg-gray-900 hover:text-white"
              >
                Contact us
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <div className="relative flex min-h-[min(420px,50vh)] w-full flex-col lg:min-h-[min(520px,70vh)]">
          <div className="card-premium group flex min-h-0 flex-1 flex-col overflow-hidden rounded-3xl bg-gradient-to-br from-[#E8F5F1] to-[#F0FDF9] shadow-[0_20px_80px_-40px_rgba(10,22,40,0.18)]">
            <span className="card-premium-topline" />
            <div className="relative min-h-[240px] flex-1">
              <HeroBolt />
              <HeroParticles />
            </div>
            <HeroStatStrip />
          </div>
        </div>
      </div>
    </section>
  );
}
