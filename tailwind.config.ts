import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F5F1EA",
        "paper-deep": "#EDE6D6",
        ink: "#10151C",
        "ink-soft": "#39404B",
        "ink-2": "#1A212C",
        "ink-3": "#242D3B",
        mute: "#6B6760",
        line: "#D9D2C2",
        "line-dark": "#2E3846",
        // TODO(landing-v2): temporary aliases of `signal` during the token migration —
        // sweep remaining `accent`/`accent-soft` usages to `signal`/`signal-soft` and delete these.
        accent: "#F2A33C",
        "accent-soft": "#F8C77E",
        signal: "#F2A33C",
        "signal-soft": "#F8C77E",
        moss: "#5A6E4A",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(2.5rem, 4.6vw, 3.7rem)", { lineHeight: "1.02", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(1.7rem, 3.4vw, 2.55rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "display-md": ["clamp(1.06rem, 1.7vw, 1.3rem)", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
      },
      animation: {
        "fade-up": "fadeUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "draw-line": "drawLine 1.2s cubic-bezier(0.65, 0, 0.35, 1) forwards",
        "blink": "blink 1.2s steps(2) infinite",
        "wire-flow": "wireFlow 24s linear infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        drawLine: {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        wireFlow: {
          to: { strokeDashoffset: "-400" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
