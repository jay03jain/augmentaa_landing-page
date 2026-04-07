import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: "Contact Augmentaa | EV Charging Infrastructure Experts",
  },
  description:
    "Reach Augmentaa Digital for EV charging hardware, software, and logistics — Delhi-NCR, Jaipur, and pan-India support.",
};

const regions = [
  {
    title: "Delhi-NCR",
    name: "Manish Rai",
    phone: "+91 84481 01155",
    email: "manish.rai@augmentaa.in",
    tel: "tel:+918448101155",
  },
  {
    title: "Jaipur",
    name: "Amit Chaturvedi",
    phone: "+91 99103 22240",
    email: "amit.chaturvedi@augmentaa.co.in",
    tel: "tel:+919910322240",
  },
  {
    title: "Rest of India",
    name: "Deepak Jain",
    phone: "+91 95605 02700",
    email: "deepak.jain@augmentaa.co.in",
    tel: "tel:+919560502700",
  },
];

function SocialRow() {
  const items = [
    { href: site.social.x, label: "X" },
    { href: site.social.facebook, label: "Facebook" },
    { href: site.social.youtube, label: "YouTube" },
    { href: site.social.linkedin, label: "LinkedIn" },
  ];
  return (
    <div className="flex flex-wrap gap-4">
      {items.map((s) => (
        <a
          key={s.href}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-brand hover:underline"
        >
          {s.label}
        </a>
      ))}
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact"
        description="Talk to an expert for quick support on chargers, software rollouts, or fleet logistics."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <Section className="bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl border border-black/10">
            <iframe
              title="Augmentaa location — Gurugram"
              src={site.mapsEmbed}
              className="h-[280px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </Section>

      <Section className="border-y border-black/5 bg-surface py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
          {regions.map((r) => (
            <article
              key={r.title}
              className="rounded-2xl border border-black/10 bg-white p-6"
            >
              <h2 className="text-lg font-bold text-ink">{r.title}</h2>
              <p className="mt-2 text-sm font-medium text-ink">{r.name}</p>
              <p className="mt-2">
                <a href={r.tel} className="text-sm text-brand hover:underline">
                  {r.phone}
                </a>
              </p>
              <p className="mt-1">
                <a
                  href={`mailto:${r.email}`}
                  className="text-sm text-muted hover:text-brand"
                >
                  {r.email}
                </a>
              </p>
            </article>
          ))}
        </div>
      </Section>

      <Section className="bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-2xl font-extrabold text-ink">Send a message</h2>
            <p className="mt-2 text-muted">
              Prefer email? Reach us at{" "}
              <a
                className="font-medium text-brand hover:underline"
                href={`mailto:${site.email.primary}`}
              >
                {site.email.primary}
              </a>
              .
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
          <div className="rounded-2xl border border-black/10 bg-surface/80 p-8">
            <h3 className="text-lg font-bold text-ink">Follow Augmentaa</h3>
            <p className="mt-2 text-sm text-muted">
              Updates on deployments, product releases, and policy context.
            </p>
            <div className="mt-6">
              <SocialRow />
            </div>
            <div className="mt-8 border-t border-black/10 pt-8 text-sm text-muted">
              <p className="font-semibold text-ink">Registered office</p>
              <p className="mt-2">
                {site.address.line1}
                <br />
                {site.address.city}
                <br />
                {site.address.country}
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
