"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

type StatConfig = {
  end: number;
  abbreviated: string;
  exactTitle: string;
  label: string;
};

function Stat({ config, showDivider }: { config: StatConfig; showDivider: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting || started.current) return;
        started.current = true;
        const start = performance.now();
        const duration = 2000;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          setProgress(easeOutCubic(t));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.25, rootMargin: "0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const n = Math.floor(progress * config.end);
  const done = progress >= 0.995;
  const text = done
    ? config.abbreviated
    : `${n.toLocaleString("en-IN")}+`;

  return (
    <div
      ref={ref}
      className={`relative px-4 text-center sm:px-6 ${
        showDivider
          ? "sm:border-r sm:border-white/10 sm:pr-8 sm:last:border-r-0"
          : ""
      }`}
    >
      <p
        className="font-mono text-3xl font-bold tracking-tight text-white drop-shadow-[0_0_14px_rgba(0,201,167,0.45)] sm:text-4xl"
        title={config.exactTitle}
      >
        {text}
      </p>
      <div className="mx-auto mt-2 h-0.5 w-8 bg-[#00C9A7]" />
      <p className="mt-2 text-sm text-white/70 sm:text-base">{config.label}</p>
    </div>
  );
}

const stats: StatConfig[] = [
  {
    end: 2_195_346,
    abbreviated: "2.2M+",
    exactTitle: "2,195,346+",
    label: "Kilometres travelled by EV fleets",
  },
  {
    end: 21_587,
    abbreviated: "21K+",
    exactTitle: "21,587+",
    label: "Vehicles charged",
  },
  {
    end: 546,
    abbreviated: "546T+",
    exactTitle: "546+",
    label: "Tons of CO₂ reduced",
  },
];

export function StatsBar() {
  return (
    <section className="relative overflow-hidden bg-[#0A1628] py-16">
      <div
        className="pointer-events-none absolute inset-0 bg-[url('/images/grid-dots.svg')] bg-[length:24px_24px] opacity-[0.05]"
        aria-hidden
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        animate={{
          background: [
            "radial-gradient(circle at 20% 30%, rgba(0,201,167,0.12), transparent 45%)",
            "radial-gradient(circle at 80% 40%, rgba(0,201,167,0.1), transparent 50%)",
            "radial-gradient(circle at 40% 70%, rgba(0,201,167,0.11), transparent 48%)",
          ],
        }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "mirror" }}
      />
      <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 sm:grid-cols-3 sm:gap-0 sm:px-6 lg:px-8">
        {stats.map((s, i) => (
          <Stat
            key={s.label}
            config={s}
            showDivider={i < stats.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
