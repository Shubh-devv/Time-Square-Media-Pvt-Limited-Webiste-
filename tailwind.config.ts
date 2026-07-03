import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  // Safelist dynamic classes that Tailwind may miss in template literals
  safelist: [
    "md:grid-cols-2",
    "md:grid-cols-3",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0B1628",
        "ink-soft": "#162338",
        "ink-line": "rgba(255,255,255,0.12)",
        paper: "#FFFFFF",
        "paper-dim": "#C4C5DA",
        blue: "#2D78C8",
        "blue-light": "#5BA3E8",
        "blue-dim": "#1B5AA0",
        amber: "#FFB02E",
        "amber-deep": "#E0901A",
        signal: "#FF3D5A",
        slate: "#9899B2",
        "slate-dim": "#50505E",
      },
      fontFamily: {
        display: ["var(--font-anton)", "Impact", "sans-serif"],
        sans: ["var(--font-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        shell: "1280px",
      },
      keyframes: {
        ticker: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        glow: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
      animation: {
        "ticker-slow": "ticker 45s linear infinite",
        "ticker-fast": "ticker 22s linear infinite",
        glow: "glow 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
