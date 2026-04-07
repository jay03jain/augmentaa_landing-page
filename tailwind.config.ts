import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0D0D0D",
        muted: "#6B7280",
        surface: "#F7F7F5",
        navy: "#0A1628",
        brand: "#00C9A7",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "grid-dots":
          "radial-gradient(circle, rgba(13,13,13,0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid-dots": "24px 24px",
      },
      boxShadow: {
        card: "0 12px 40px -12px rgba(10, 22, 40, 0.12)",
        nav: "0 8px 30px -18px rgba(10, 22, 40, 0.15)",
      },
      keyframes: {
        "mesh-shift": {
          "0%": { backgroundPosition: "0 0" },
          "100%": { backgroundPosition: "24px 24px" },
        },
      },
      animation: {
        "mesh-shift": "mesh-shift 80s linear infinite",
      },
    },
  },
  plugins: [typography],
};
export default config;
