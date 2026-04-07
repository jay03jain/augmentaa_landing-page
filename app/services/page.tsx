import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import Link from "next/link";

export const metadata: Metadata = {
  title: "EV Charging Services & Software",
  description:
    "SPARK EV, SPARK DRIVE, BATTERY PULSE, charging parks, custom B2B deployments, and intracity EV distribution from Augmentaa Digital.",
};

const software = [
  {
    name: "SPARK EV — Charging management",
    desc: "Centralised control and monitoring for charging stations, OCPP diagnostics, tariffs, and operations.",
    tag: "Learn more",
    href: "/contact",
  },
  {
    name: "SPARK DRIVE — Vehicle management",
    desc: "Fleet tracking, maintenance, analytics, and alerts to keep utilisation high and downtime low.",
    tag: "Learn more",
    href: "/contact",
  },
  {
    name: "BATTERY PULSE — Battery analytics",
    desc: "Single dashboard integrating TCU data across providers for unified monitoring on mixed fleets.",
    tag: "Coming soon",
    href: "/contact",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Services"
        description="Explore our software, charging infrastructure programmes, and intracity logistics designed for Indian B2B operators."
        crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]}
      />

      <Section
        id="technological"
        className="scroll-mt-24 bg-white py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            Technological solutions
          </p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Software that keeps sites healthy and fleets productive
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
            Explore our solutions built to enhance efficiency, streamline
            processes, and solve field problems at scale — from charger
            diagnostics to driver-ready analytics.
          </p>
          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {software.map((item) => (
              <article
                key={item.name}
                className="flex h-full flex-col rounded-2xl border border-black/10 bg-surface/60 p-8"
              >
                <h3 className="text-lg font-bold text-ink">{item.name}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {item.desc}
                </p>
                <Link
                  href={item.href}
                  data-umami-event="services-learn-more"
                  data-umami-event-software={item.name}
                  className="mt-6 inline-flex text-sm font-semibold text-brand hover:underline"
                >
                  {item.tag} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section
        id="emobility"
        className="scroll-mt-24 border-y border-black/5 bg-surface py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl space-y-16 px-4 sm:px-6 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              e-Mobility enabler
            </p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
              Charging parks & custom application
            </h2>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <h3 className="text-2xl font-bold text-ink">Charging parks</h3>
              <p className="mt-4 text-muted leading-relaxed">
                Keeping industry realities in view, Augmentaa offers charging and
                parking capacity tailored for electric vehicle fleet operators.
                Hubs are positioned close to marketplaces with sound safety and
                security — mitigating fire and shock risks.
              </p>
              <p className="mt-4 text-muted leading-relaxed">
                Fleet operators and drivers gain confidence in vehicle and battery
                safety, with charging managed so assets stay productive the next
                day.
              </p>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-black/10 bg-white">
              <Image
                src="/images/service-1.jpg"
                alt="Charging infrastructure"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="relative order-2 aspect-[4/3] overflow-hidden rounded-2xl border border-black/10 bg-white lg:order-1">
              <Image
                src="/images/service-2.jpg"
                alt="Custom EV charging solutions"
                fill
                className="object-cover"
                sizes="(max-width:1024px) 100vw, 50vw"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h3 className="text-2xl font-bold text-ink">Custom application</h3>
              <p className="mt-4 text-muted leading-relaxed">
                Augmentaa Digital provides tailored EV charging solutions for
                businesses. Our B2B scope covers design, installation, and
                maintenance of captive charging stations for fleet owners and
                commercial operators.
              </p>
              <p className="mt-4 text-muted leading-relaxed">
                Installations are built to scale with your fleet while embedding
                energy management, load balancing, and advanced monitoring for
                safe, uninterrupted operations.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-muted">
                <li>
                  • Current footprint across multiple states with anchors
                  near demand centres.
                </li>
                <li>
                  • Expansion alongside anchor customers with infrastructure they
                  can rely on.
                </li>
                <li>
                  • Smart charging, predictive maintenance, and real-time
                  visibility baked into hub operations.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section
        id="intracity"
        className="scroll-mt-24 bg-surface py-16 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
            Intracity distribution
          </p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Clean last-mile logistics
          </h2>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
            Augmentaa operates intracity distribution on electric vehicles to cut
            greenhouse emissions in cities while delivering dependable service to
            customers. Last-mile programmes are live in Jaipur with owned assets
            supporting daily routes.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 text-sm text-muted">
            <li className="rounded-xl border border-black/10 bg-white p-4">
              <span className="font-semibold text-ink">Lower urban emissions</span>
              <br />
              EV-led fulfilment replaces diesel kilometres on dense city loops.
            </li>
            <li className="rounded-xl border border-black/10 bg-white p-4">
              <span className="font-semibold text-ink">Operational discipline</span>
              <br />
              Charging + fleet telemetry keeps SLAs realistic and measurable.
            </li>
            <li className="rounded-xl border border-black/10 bg-white p-4">
              <span className="font-semibold text-ink">Asset ownership</span>
              <br />
              Augmentaa-owned equipment reduces partner risk during pilots.
            </li>
            <li className="rounded-xl border border-black/10 bg-white p-4">
              <span className="font-semibold text-ink">Nationwide playbook</span>
              <br />
              Lessons from live routes inform charger deployments elsewhere.
            </li>
          </ul>
        </div>
      </Section>
    </>
  );
}
