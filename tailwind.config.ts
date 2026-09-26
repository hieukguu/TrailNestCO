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
        /* Forest ink — deep natural greens for the outdoor editorial system */
        pine: {
          50: "#f2f6f3",
          100: "#e3ebe5",
          200: "#c7d8cc",
          300: "#9fbaa8",
          400: "#72947e",
          500: "#52745f",
          600: "#3d5948",
          700: "#31473b",
          800: "#293a32",
          900: "#213029",
          950: "#101d17",
        },
        /* Trail blaze — restrained safety orange, never decorative neon */
        ember: {
          300: "#f3b77a",
          400: "#e99a4b",
          500: "#d77d2f",
          600: "#a9541d",
        },
        sand: {
          50: "#fffdf8",
          100: "#f6f2e9",
          200: "#e8e0d1",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        serif: ["var(--font-display)", "Georgia", "serif"],
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
