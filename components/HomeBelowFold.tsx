"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Section } from "@/components/Section";
import { StatsBar } from "@/components/StatsBar";
import { WaveDivider } from "@/components/WaveDivider";
import {
  IconChargingPlug,
  IconCircuit,
  IconDeliveryRoute,
} from "@/components/ServiceIcons";
import { products } from "@/lib/products";

const services = [
  {
    title: "Technological Solutions",
    desc: "Robust management applications that optimise EV charging infrastructure for seamless operations and a better user experience.",
    href: "/services#technological",
    Icon: IconCircuit,
  },
  {
    title: "e-Mobility Enabler",
    desc: "Tailored EV charging programmes for businesses — from captive hubs to custom deployments aligned with your fleet.",
    href: "/services#emobility",
    Icon: IconChargingPlug,
  },
  {
    title: "Intracity Distribution",
    desc: "Last-mile logistics powered by electric vehicles — reducing urban emissions while keeping routes productive.",
    href: "/services#intracity",
    Icon: IconDeliveryRoute,
  },
];

const whyFeatures: { title: string; desc: string }[] = [
  {
    title: "OCPP 2.0 Compliant",
    desc: "Open, interoperable charging stacks ready for modern central systems.",
  },
  {
    title: "Pan-India Support Network",
    desc: "Regional experts across NCR, Jaipur, and national rollouts.",
  },
  {
    title: "Real-time Monitoring",
    desc: "Live visibility into sessions, alarms, and site health.",
  },
  {
    title: "Government EV Policy Aligned",
    desc: "Designs that map to India’s evolving EV and energy norms.",
  },
  {
    title: "Custom Deployment Options",
    desc: "Hardware + software packages sized to your footprint.",
  },
  {
    title: "24/7 Technical Support",
    desc: "Responsive help when uptime matters for your operations.",
  },
];

function CheckIcon() {
  return (
    <svg
      className="mt-0.5 h-5 w-5 shrink-0 text-[#00C9A7]"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-7.5 9.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 6.948-8.746a.75.75 0 011.052-.143z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function HomeBelowFold() {
  const strip = [...products, ...products];

  return (
    <>
      <StatsBar />

      <WaveDivider fill="#FFFFFF" />

      <Section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="section-overline">What we deliver</p>
          <h2 className="mt-4 max-w-3xl text-balance text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Infrastructure, software, and operations — together
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-[1.75] text-gray-600">
            Welcome to Augmentaa Digital — your partner for EV charging and fleet
            productivity. We help you run the business while we keep electrons
            moving reliably.
          </p>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {services.map((s) => {
              const Icon = s.Icon;
              return (
                <motion.div
                  key={s.title}
                  whileHover={{ y: -4 }}
                  className="card-premium group flex h-full flex-col p-8"
                >
                  <span className="card-premium-topline" />
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-[#00C9A7]">
                    <Icon />
                  </div>
                  <h3 className="relative mt-4 text-xl font-bold text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-[1.75] text-gray-600">
                    {s.desc}
                  </p>
                  <Link
                    href={s.href}
                    data-umami-event="services-learn-more"
                    data-umami-event-service={s.title}
                    className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-ink transition-colors after:block after:h-0.5 after:w-0 after:bg-[#00C9A7] after:transition-all hover:text-[#00C9A7] hover:after:w-full"
                  >
                    Learn more →
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </Section>

      <WaveDivider fill="#F7F7F5" />

      <Section className="bg-[#F7F7F5] py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-balance text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              Hardware built for Indian infrastructure
            </h2>
            <p className="mt-5 text-lg leading-[1.75] text-gray-600">
              A full lineup of AC and DC chargers — engineered for uptime,
              network connectivity, and the safety expectations of fleet and
              commercial sites.
            </p>
            <motion.div
              className="mt-8"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/products"
                data-umami-event="home-view-products"
                className="inline-flex rounded-full border-2 border-gray-900 px-7 py-3 text-sm font-semibold text-gray-900 transition-colors duration-200 hover:bg-gray-900 hover:text-white"
              >
                View all products
              </Link>
            </motion.div>
          </div>
          <div className="card-premium group relative overflow-hidden rounded-2xl bg-white p-0">
            <span className="card-premium-topline" />
            <motion.div
              className="flex gap-6 py-6 pl-6"
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: 38,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              {strip.map((p, i) => (
                <div
                  key={`${p.id}-${i}`}
                  className="relative h-40 w-52 shrink-0"
                >
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    className="object-contain"
                    sizes="208px"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </Section>

      <WaveDivider fill="#E8F5F1" />

      <section className="relative overflow-hidden bg-[#E8F5F1] py-20 sm:py-24">
        <span
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-sans text-[min(80vw,28rem)] font-black leading-none text-[#00C9A7] opacity-[0.03]"
          aria-hidden
        >
          √
        </span>
        <div className="relative mx-auto grid max-w-6xl gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
          <div>
            <h2 className="text-balance text-5xl font-black leading-[1.05] tracking-tight text-ink sm:text-6xl">
              Built for
              <br />
              <span className="relative inline-block">
                Indian
                <span className="absolute bottom-1 left-0 h-1 w-full bg-[#00C9A7]" />
              </span>
              <br />
              EV
              <br />
              Infrastructure
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            {whyFeatures.map((f) => (
              <div key={f.title} className="flex gap-3">
                <CheckIcon />
                <div>
                  <p className="font-bold text-ink">{f.title}</p>
                  <p className="mt-1 text-sm leading-[1.75] text-gray-600">
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WaveDivider fill="#0A1628" />

      <section className="relative overflow-hidden bg-navy py-20 text-white sm:py-24">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, rgba(0,201,167,0.25), transparent 45%)",
              "radial-gradient(circle at 80% 40%, rgba(0,201,167,0.2), transparent 50%)",
              "radial-gradient(circle at 40% 70%, rgba(0,201,167,0.22), transparent 48%)",
            ],
          }}
          transition={{ duration: 18, repeat: Infinity, repeatType: "mirror" }}
        />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-8 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Ready to electrify your fleet?
            </h2>
            <p className="mt-3 max-w-xl leading-[1.75] text-white/75">
              Share your sites, utilisation targets, and timelines — we&apos;ll
              propose a deployment path that fits.
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/contact"
              data-umami-event="home-get-in-touch"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#00C9A7] px-8 py-3 text-sm font-semibold text-white shadow-md shadow-teal-200/50 transition-colors hover:bg-[#00b396]"
            >
              Get in touch
              <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
