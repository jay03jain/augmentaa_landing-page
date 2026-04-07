import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageMesh } from "@/components/PageMesh";
import { site } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const gaId = process.env.NEXT_PUBLIC_GA_ID;
const umamiSrc = process.env.NEXT_PUBLIC_UMAMI_SRC;
const umamiSite = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Augmentaa Digital | EV Charging Solutions for India",
    template: "%s | Augmentaa Digital",
  },
  description:
    "EV charging hardware, charging & fleet software, and intracity EV logistics for Indian B2B fleets, real estate, and operators.",
  openGraph: {
    title: "Augmentaa Digital | EV Charging Solutions for India",
    description:
      "AC/DC chargers, SPARK EV / SPARK DRIVE / BATTERY PULSE, and pan-India deployment support.",
    url: site.url,
    siteName: site.name,
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="relative min-h-screen bg-white font-sans antialiased">
        <PageMesh />
        <Navbar />
        <main className="relative z-10 pt-16">{children}</main>
        <div className="relative z-10">
          <div
            className="pointer-events-none h-10 w-full bg-gradient-to-b from-transparent to-[#0A1628]"
            aria-hidden
          />
          <Footer />
        </div>
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
        {umamiSrc && umamiSite ? (
          <Script
            async
            defer
            data-website-id={umamiSite}
            src={umamiSrc}
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
