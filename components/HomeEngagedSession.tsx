"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

export function HomeEngagedSession() {
  useEffect(() => {
    const t = window.setTimeout(() => {
      trackEvent("engaged_session", { page: "home", seconds: 60 });
    }, 60_000);
    return () => window.clearTimeout(t);
  }, []);
  return null;
}
