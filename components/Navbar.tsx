"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-black/5 bg-white/95 shadow-nav backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-[4.25rem] sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo.png"
              alt="Augmentaa Digital"
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
              priority
            />
            <span className="text-lg font-extrabold tracking-tight text-ink">
              Augmentaa
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`relative text-sm font-medium transition-colors hover:text-[#00C9A7] ${
                  pathname === l.href ? "text-ink" : "text-muted"
                }`}
              >
                {l.label}
                {pathname === l.href ? (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-[#00C9A7]" />
                ) : null}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/contact"
                data-umami-event="nav-get-in-touch"
                onClick={() => trackEvent("nav_cta_click")}
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#00C9A7] px-5 py-2 text-sm font-semibold text-white shadow-md shadow-teal-200/50 transition-colors hover:bg-[#00b396]"
              >
                Get in Touch
                <span className="inline-block text-xs transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </motion.div>
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-black/10 md:hidden"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <span className="sr-only">Menu</span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-[60] bg-black/40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed inset-y-0 right-0 z-[70] w-[min(100%,320px)] bg-white shadow-2xl md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
            >
              <div className="flex items-center justify-between border-b border-black/5 px-4 py-4">
                <span className="font-bold text-ink">Menu</span>
                <button
                  type="button"
                  className="rounded-md p-2 text-muted hover:text-ink"
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
              <nav className="flex flex-col gap-1 p-4">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-surface"
                  >
                    {l.label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  data-umami-event="nav-get-in-touch-mobile"
                  onClick={() => trackEvent("nav_cta_click")}
                  className="mt-4 rounded-full bg-[#00C9A7] px-4 py-3 text-center text-sm font-semibold text-white shadow-md shadow-teal-200/50 transition-colors hover:bg-[#00b396]"
                >
                  Get in Touch
                </Link>
              </nav>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
