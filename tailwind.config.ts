import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#112C48",
        gold: "#D1A447",
        stone: "#AEAAA4",
        ivory: "#F7F4EF",
      },
    },
  },
  plugins: [],
} satisfies Config;
