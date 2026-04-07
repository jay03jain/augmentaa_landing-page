import Link from "next/link";
import { site } from "@/lib/site";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About us" },
  { href: "/services", label: "Services" },
  { href: "/disclaimer", label: "Privacy & disclaimer" },
];

const social = [
  { href: site.social.x, label: "X", icon: "x" as const },
  { href: site.social.facebook, label: "Facebook", icon: "fb" as const },
  { href: site.social.youtube, label: "YouTube", icon: "yt" as const },
  { href: site.social.linkedin, label: "LinkedIn", icon: "in" as const },
];

function SocialIcon({ icon }: { icon: "x" | "fb" | "yt" | "in" }) {
  const common = "h-5 w-5 transition-colors";
  if (icon === "x") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  if (icon === "fb") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.988h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
      </svg>
    );
  }
  if (icon === "yt") {
    return (
      <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    );
  }
  return (
    <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0A1628] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="text-xl font-extrabold tracking-tight">{site.name}</p>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
            {site.tagline}
          </p>
          <p className="mt-4 max-w-sm text-xs leading-relaxed text-white/55">
            Committed to reducing India&apos;s carbon footprint — one charge at a
            time. 🌱
          </p>
          <div className="mt-6 flex gap-4">
            {social.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#00C9A7]"
                aria-label={s.label}
              >
                <SocialIcon icon={s.icon} />
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-white/50">
            Useful links
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {footerLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-white/80 transition-colors hover:text-[#00C9A7]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-white/50">
            Contact
          </p>
          <p className="mt-4 text-sm text-white/80">
            {site.address.line1}
            <br />
            {site.address.city}
            <br />
            {site.address.country}
          </p>
          <p className="mt-3 text-sm text-white/80">
            <a
              href="tel:+919560502700"
              className="transition-colors hover:text-[#00C9A7]"
            >
              +91 95605 02700
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center text-xs text-white/50 sm:px-6 lg:px-8">
          © {year} Augmentaa Digital. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
