"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { trackEvent } from "@/lib/analytics";

export function SiteAssessmentCta() {
  return (
    <section className="bg-[#E8F5F1] py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-balance text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
          Not sure which charger fits your site?
        </h2>
        <p className="mt-4 text-lg leading-[1.75] text-gray-600">
          Our team will assess your site, load requirements, and recommend the
          right hardware — at no cost.
        </p>
        <motion.div
          className="mt-8 inline-block"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            href="/contact"
            data-umami-event="site-assessment-cta"
            onClick={() => trackEvent("site_assessment_cta_click")}
            className="group inline-flex items-center gap-2 rounded-full bg-[#00C9A7] px-8 py-3 text-sm font-semibold text-white shadow-md shadow-teal-200/50 transition-colors hover:bg-[#00b396]"
          >
            Book a free site assessment
            <span className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
