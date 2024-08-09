import type { Config } from "tailwindcss"

export default {
  content: [
    "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {}
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "business"]
  },
  darkMode: ['class', '[data-theme="business"]']
} satisfies Config
