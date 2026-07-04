import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Ink — near-black neutrals (Web Rocket style) */
        pine: {
          50: "#f5f6f7",
          100: "#eceef0",
          200: "#d8dbdf",
          300: "#b6bac2",
          400: "#8b909c",
          500: "#636876",
          600: "#464a56",
          700: "#31343e",
          800: "#22242c",
          900: "#16181d",
          950: "#0f1013",
        },
        /* Lime accent */
        ember: {
          300: "#e4fb8a",
          400: "#d6f55e",
          500: "#c6ef37",
          600: "#71950c",
        },
        sand: {
          50: "#ffffff",
          100: "#f4f5f6",
          200: "#e6e8ea",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
