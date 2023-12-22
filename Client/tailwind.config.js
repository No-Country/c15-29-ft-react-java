// tailwind.config.js
import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    // ...
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      animation: {
        'raining': 'raining 2s linear infinite',
      }
    },
    keyframes: {
      raining: {
        '0%': { ransform: 'translateY(-20vh)', },
        "25%": { transform: "translateY(0vh)" },
        // "50%": { transform: "translateY(100vh)" },
        "75%": { transform: "translateY(0vh)" },
        "100%": { transform: "translateY(20vh)" }
      }
    }
  },
  darkMode: "class",
  plugins: [nextui()]
}

export default config;