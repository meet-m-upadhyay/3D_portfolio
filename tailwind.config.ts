import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#050A10", 
        surface: "#08101a", 
        "surface-container-low": "#0A192F",
        "surface-container": "#0c1d35",
        "surface-container-high": "#0e2240",
        "surface-container-highest": "#10264a",
        "surface-container-lowest": "#030712",
        "surface-variant": "#0A192F",
        primary: "#00E5FF", 
        "primary-container": "#00b8cc",
        "on-primary": "#00363d",
        secondary: "#0A192F",
        tertiary: "#7000FF", 
        "outline-variant": "#1c3254",
        "on-surface": "#dde3ec",
        "on-surface-variant": "#8892b0", 
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        label: ["Manrope", "sans-serif"],
      },
      backgroundImage: {
        "primary-gradient": "linear-gradient(135deg, #00E5FF 0%, #7000FF 100%)",
        "glow-radial": "radial-gradient(circle at center, rgba(0, 229, 255, 0.15) 0%, transparent 70%)"
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      boxShadow: {
        "kinetic": "0 24px 48px -12px rgba(0, 229, 255, 0.08)",
        "kinetic-hover": "0 32px 64px -16px rgba(0, 229, 255, 0.2)",
        "glow": "0 0 25px rgba(0, 229, 255, 0.5)",
        "button-glow": "0 0 15px rgba(0, 229, 255, 0.6)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 5s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        }
      }
    },
  },
  plugins: [],
} satisfies Config;
