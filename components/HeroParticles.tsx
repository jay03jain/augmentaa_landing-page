"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { loadParticlesLinksInteraction } from "@tsparticles/interaction-particles-links";
import type { ISourceOptions } from "@tsparticles/engine";

export function HeroParticles() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
      await loadParticlesLinksInteraction(engine);
      if (mounted) setReady(true);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: false },
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      particles: {
        number: { value: 80, density: { enable: true, width: 800, height: 600 } },
        color: { value: "#00C9A7" },
        opacity: { value: { min: 0.2, max: 0.55 } },
        size: { value: { min: 2, max: 3 } },
        move: {
          enable: true,
          speed: 0.8,
          direction: "none",
          random: true,
          straight: false,
          outModes: { default: "bounce" },
        },
        links: {
          enable: true,
          distance: 120,
          color: "#00C9A7",
          opacity: 0.3,
          width: 0.8,
        },
      },
      interactivity: {
        events: {
          onHover: { enable: true, mode: "repulse" },
          onClick: { enable: false },
        },
        modes: {
          repulse: { distance: 90, duration: 0.25 },
        },
      },
      detectRetina: true,
    }),
    [],
  );

  if (!ready) {
    return (
      <div
        className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(0,201,167,0.12),transparent_55%)]"
        aria-hidden
      />
    );
  }

  return (
    <Particles
      id="hero-particles"
      className="h-full w-full"
      options={options}
    />
  );
}
