import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0b0f14",
        foreground: "#e6edf6",
        muted: "#14202e",
        card: "rgba(255,255,255,0.06)"
      },
      boxShadow: {
        soft: "0 10px 30px rgba(0,0,0,0.35)"
      }
    }
  },
  plugins: []
};
export default config;
