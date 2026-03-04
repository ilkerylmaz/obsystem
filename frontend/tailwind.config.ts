import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        primary: {
          50:  "#eef5fd",
          100: "#dceaf9",
          200: "#b3d1f0",
          300: "#7ab0e2",
          400: "#4a8fd4",
          500: "#2770b8",
          600: "#215a99",
          700: "#1e4080",
          800: "#1a3a6b",
          900: "#0f2744",
        },
        surface: {
          bg:     "#f4f6f9",
          card:   "#ffffff",
          border: "#e2e8f0",
          muted:  "#f8fafc",
        },
        sidebar: {
          bg:       "#1e3a5f",
          text:     "#b3d1f0",
          active:   "#ffffff",
        },
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
        xl: "20px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        md:   "0 4px 12px rgba(0,0,0,0.08), 0 2px 4px rgba(0,0,0,0.04)",
        lg:   "0 10px 30px rgba(0,0,0,0.10), 0 4px 8px rgba(0,0,0,0.05)",
        modal:"0 20px 60px rgba(0,0,0,0.18), 0 8px 20px rgba(0,0,0,0.08)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-in": "slideIn 0.25s ease-out",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(6px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          from: { opacity: "0", transform: "translateX(-8px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
