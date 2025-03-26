/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#2B59FF", // Same as primary-blue.DEFAULT
        "primary-blue": {
          DEFAULT: "#2B59FF",
          100: "#F5F8FF",
        },
        "secondary-orange": "#f79761",
        "muted-foreground": "#94a3b8", // Tailwind gray-400
        background: "#091121",
        // Hero background
        "light-white": {
          DEFAULT: "rgba(59,60,152,0.03)",
          100: "rgba(59,60,152,0.02)",
        },
        grey: "#747A88",
        "black-100": "#2B2C35",
      },
      backgroundImage: {
        pattern: "url('/pattern.png')",
        "hero-bg": "url('/hero-bg.png')",
        "grid-pattern":
          "repeating-linear-gradient(0deg, #fff1 0px, #fff1 1px, transparent 1px, transparent 32px), repeating-linear-gradient(90deg, #fff1 0px, #fff1 1px, transparent 1px, transparent 32px)",
      },
    },
  },
  plugins: [],
};
