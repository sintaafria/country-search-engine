/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        danger: "var(--danger)",
        neutral: "var(--neutral)",
        primary: "var(--primary)",
        secondary: "var(--secondary)"
      },
    },
  },
  plugins: [
    plugin(function({ addComponents }) {
      addComponents({
        '.flex-item-center': {
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }
      })
    })
  ],
};
