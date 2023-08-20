/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        accent: {
          1: `var(--color-bkg)`,
        },
        primary: {
          1: `#0c061f`,
        },
      },
      backgroundImage: {
        bg: `var(--bg-image)`,
      },
    },
  },
  plugins: [],
};
