import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { ProductCard } from "@/components/ProductCard";
import { SiteAssessmentCta } from "@/components/SiteAssessmentCta";
import { EnquiryForm } from "@/components/EnquiryForm";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "EV Chargers — AC & DC Charging Hardware",
  description:
    "Explore Augmentaa’s AC and DC EV chargers — from Type 2 AC to CCS and GB/T DC fast charging for Indian B2B sites.",
};

export default function ProductsPage() {
  const ac = products.filter((p) => p.category === "ac");
  const dc = products.filter((p) => p.category === "dc");

  return (
    <>
      <PageHeader
        title="Products"
        description="Powering the future of electric mobility with a comprehensive range of EV chargers — engineered for performance, reliability, and seamless integration."
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Products" },
        ]}
      />

      <Section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink">
            AC chargers
          </h2>
          <p className="mt-2 max-w-2xl leading-[1.75] text-gray-600">
            Built for dependable operations across captive, semi-public, and fleet
            parking environments.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {ac.map((p) => (
              <ProductCard
                key={p.id}
                name={p.name}
                image={p.image}
                specs={p.specs}
                glb={p.glb}  
              />
            ))}
          </div>
        </div>
      </Section>

      <Section className="border-y border-black/5 bg-[#F7F7F5] py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-ink">
            DC fast chargers
          </h2>
          <p className="mt-2 max-w-2xl leading-[1.75] text-gray-600">
            High-power DC options for hubs and corridors where turnaround time is
            critical.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {dc.map((p) => (
              <ProductCard
                key={p.id}
                name={p.name}
                image={p.image}
                specs={p.specs}
                glb={p.glb}  
              />
            ))}
          </div>
        </div>
      </Section>

      <SiteAssessmentCta />

      <Section className="bg-[#F7F7F5] py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-ink">Request a quote</h2>
          <p className="mt-2 leading-[1.75] text-gray-600">
            Tell us about your load, connectors, and rollout timeline — we&apos;ll
            respond with a tailored proposal.
          </p>
          <div className="mt-8 card-premium group rounded-2xl bg-white p-6 sm:p-8">
            <span className="card-premium-topline" />
            <EnquiryForm />
          </div>
        </div>
      </Section>
    </>
  );
}
