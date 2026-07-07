import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0D0D0D",
        "bg-warm": "#161312",
        "bg-elevated": "#1C1815",
        border: "#2A2420",
        "border-strong": "#3D342C",
        text: "#F5EFE8",
        "text-muted": "#8A8278",
        "text-faint": "#5A544C",
        amber: "#E8923C",
        "amber-bright": "#F5A956",
        cool: "#B8D4E3",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: { tightest: "-0.04em" },
      keyframes: {
        drift: {
          "0%,100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-8px) translateX(4px)" },
        },
      },
      animation: { drift: "drift 8s ease-in-out infinite" },
    },
  },
  plugins: [],
};
export default config;
