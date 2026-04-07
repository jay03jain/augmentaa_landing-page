import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Augmentaa Digital accelerates India’s transition to electric mobility with charging infrastructure, fleet software, and sustainable logistics.",
};

const pillars = [
  {
    title: "Technological solutions",
    copy:
      "Robust management applications that optimise EV charging infrastructure for seamless operations and user experience.",
    href: "/services#technological",
  },
  {
    title: "e-Mobility enabler",
    copy: "Tailored EV charging programmes for businesses and captive fleets.",
    href: "/services#emobility",
  },
  {
    title: "Intracity distribution",
    copy:
      "Eco-friendly intracity logistics that keep cities cleaner without sacrificing fulfilment speed.",
    href: "/services#intracity",
  },
];

const team = [
  { name: "Leadership", role: "Placeholder — update with bio", initials: "AD" },
  { name: "Operations", role: "Placeholder — update with bio", initials: "OP" },
  { name: "Technology", role: "Placeholder — update with bio", initials: "TX" },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Augmentaa"
        description={site.tagline}
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <Section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand">
              Revolutionizing eMobility
            </p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              We are building India&apos;s EV infrastructure layer
            </h2>
            <p className="mt-5 text-muted leading-relaxed">
              At Augmentaa Digital, we are not just a company — we are a movement.
              Founded in 2023 to accelerate the shift to electric mobility, we are
              advancing EV infrastructure and digital solutions that make
              sustainable transportation seamless for businesses.
            </p>
            <p className="mt-4 text-muted leading-relaxed">
              From an expanding network of charging hubs to intelligent fleet
              systems, we are shaping green mobility in India with pragmatic,
              field-tested programmes.
            </p>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-black/10">
            <Image
              src="/images/about.jpg"
              alt="Augmentaa team and operations"
              fill
              className="object-cover"
              sizes="(max-width:1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </Section>

      <Section className="border-y border-black/5 bg-surface py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-2 sm:px-6 lg:px-8">
          <figure className="rounded-2xl border border-black/10 bg-white p-10">
            <figcaption className="text-xs font-semibold uppercase tracking-wider text-brand">
              Our mission
            </figcaption>
            <blockquote className="mt-4 text-2xl font-extrabold leading-snug text-ink sm:text-3xl">
              Empowering the future of mobility through cutting-edge technology and
              robust infrastructure.
            </blockquote>
          </figure>
          <figure className="rounded-2xl border border-black/10 bg-white p-10">
            <figcaption className="text-xs font-semibold uppercase tracking-wider text-brand">
              Our vision
            </figcaption>
            <blockquote className="mt-4 text-2xl font-extrabold leading-snug text-ink sm:text-3xl">
              A future where seamless connectivity and sustainable EV mobility
              redefine how we live, work, and innovate.
            </blockquote>
          </figure>
        </div>
      </Section>

      <Section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
            What we do
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Three pillars anchor every engagement — software, infrastructure, and
            the logistics layer that proves reliability in the real world.
          </p>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {pillars.map((p) => (
              <article
                key={p.title}
                className="rounded-2xl border border-black/10 bg-surface/50 p-8"
              >
                <h3 className="text-lg font-bold text-ink">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {p.copy}
                </p>
                <Link
                  href={p.href}
                  data-umami-event="about-pillar-explore"
                  data-umami-event-pillar={p.title}
                  className="mt-4 inline-flex text-sm font-semibold text-brand"
                >
                  Explore →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
            Leadership
          </h2>
          <p className="mt-3 text-muted">
            Placeholder cards — drop in names, portraits, and titles when ready.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {team.map((m) => (
              <article
                key={m.name}
                className="rounded-2xl border border-black/10 bg-white p-6 text-center"
              >
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand/15 text-xl font-extrabold text-navy">
                  {m.initials}
                </div>
                <h3 className="mt-4 text-lg font-bold text-ink">{m.name}</h3>
                <p className="mt-2 text-sm text-muted">{m.role}</p>
              </article>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-ink">Hear from us</h2>
          <div className="mt-8 aspect-video overflow-hidden rounded-2xl border border-black/10 bg-black">
            <iframe
              title="Augmentaa Digital on YouTube"
              src={site.youtubeEmbed}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href={site.social.x}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-brand hover:underline"
            >
              X / Twitter
            </a>
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-brand hover:underline"
            >
              Facebook
            </a>
            <a
              href={site.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-brand hover:underline"
            >
              YouTube
            </a>
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-brand hover:underline"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
