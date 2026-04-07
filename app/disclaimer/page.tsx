import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Privacy & Disclaimer",
  description:
    "Privacy policy and disclaimer for Augmentaa Digital websites and applications.",
};

const sections: { title: string; body: string[] }[] = [
  {
    title: "Disclaimer",
    body: [
      "This Privacy Policy is subject to change at any time without notice. To make sure you are aware of any changes, please review this Privacy Policy periodically.",
    ],
  },
  {
    title: "Consent",
    body: [
      "By using our website or other applications including Mobile Apps, Web Applications, and Digital Gadget Solutions, you consent to our Privacy Policy and agree to its terms.",
    ],
  },
  {
    title: "Collection of user information",
    body: [
      "We collect and store your personal information (except payment-related details) to provide a safe, efficient, and customised experience. This includes name, contact details, vehicle details, and other necessary data.",
    ],
  },
  {
    title: "Use of information",
    body: [
      "Your personal information is used to provide services, troubleshoot problems, promote a safe service, and customise your experience. We may also analyse demographic and profile data about user activity.",
    ],
  },
  {
    title: "Information you voluntarily provide",
    body: [
      "When registering an account, we may collect your email address, phone number, profile information, and account linking details for smart devices.",
    ],
  },
  {
    title: "Information we collect automatically",
    body: [
      "Device information: charger serial number, IP address, OS version, application version, and network information.",
      "Usage data: visits, clicks, downloads, messages sent/received, and other activities.",
      "Location information: collected when using location-based services.",
    ],
  },
  {
    title: "Your rights relating to your personal data",
    body: [
      "You may request access, correction, or deletion of your personal data.",
      "You may request restrictions or transfer of personal data.",
      "You may opt out of our use of your personal data for marketing purposes.",
    ],
  },
  {
    title: "Information sharing",
    body: [
      "We may share personal information with our affiliates to prevent fraud or illegal acts. We may also disclose personal information to law enforcement as required by law.",
    ],
  },
  {
    title: "Third-party services",
    body: [
      "Our application integrates with payment gateways, but we are not responsible for their privacy practices. Payment data is protected under their respective data protection policies.",
    ],
  },
  {
    title: "Security measures",
    body: [
      "We implement reasonable safeguards to protect your personal information. If you suspect any security issues, please notify us immediately.",
    ],
  },
  {
    title: "Opt-out option",
    body: [
      "Users can opt out of receiving promotional communications by removing application login access.",
    ],
  },
  {
    title: "Advertisements",
    body: [
      "Third-party advertising companies may serve ads based on your interests but will not have access to personally identifiable information.",
    ],
  },
  {
    title: "Legal application and jurisdiction",
    body: [
      "This policy is governed by the laws of the Republic of India.",
    ],
  },
  {
    title: "Contact information",
    body: [
      "For further information, please contact Augmentaa Digital Services.",
    ],
  },
];

export default function DisclaimerPage() {
  return (
    <>
      <PageHeader
        title="Privacy & policies"
        crumbs={[{ label: "Home", href: "/" }, { label: "Privacy & policies" }]}
      />
      <div className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-3xl space-y-12 px-4 sm:px-6 lg:px-8">
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="text-xl font-bold text-ink">{s.title}</h2>
              <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                {s.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
