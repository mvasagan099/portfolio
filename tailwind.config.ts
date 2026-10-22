/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0B0B0F",
        surface: "#131318",
        surfaceAlt: "#18181F",
        border: "#262630",
        foreground: "#EDEDF0",
        muted: "#9CA3AF",
        accent: "#6EE7B7",
        accentStrong: "#34D399",
        "accent-dim": "#10B981",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      animation: {
        "spin-slow": "spin 6s linear infinite",
        pulse: "pulse 2.4s ease-in-out infinite",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
      },
      maxWidth: {
        content: "72rem",
      },
    },
  },
  plugins: [],
};
