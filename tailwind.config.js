/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        font: { color: `var( --color-primary-text)` },
        primary: {
          1: `var(--color-primary-1)`,
          2: `var(--color-primary-2)`,
        },
      },
      backgroundImage: {
        bg: `var(--bg-image)`,
      },
    },
  },
  plugins: [],
};
