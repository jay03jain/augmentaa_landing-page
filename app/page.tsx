import type { Metadata } from "next";
import { HomeHero } from "@/components/HomeHero";
import { HomeBelowFold } from "@/components/HomeBelowFold";
import { HomeEngagedSession } from "@/components/HomeEngagedSession";

export const metadata: Metadata = {
  title: "Augmentaa Digital | EV Charging Solutions for India",
  description:
    "AC/DC EV chargers, SPARK EV / SPARK DRIVE / BATTERY PULSE software, and intracity EV logistics for Indian B2B fleets.",
};

export default function HomePage() {
  return (
    <>
      <HomeEngagedSession />
      <HomeHero />
      <HomeBelowFold />
    </>
  );
}
