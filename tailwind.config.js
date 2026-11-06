/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        binance: {
          yellow: "#F0B90B",
          yellowHover: "#FCD535",
          dark: "#181A20",
          darker: "#0B0E11",
          gray: "#2B313A",
          lightGray: "#474D57"
        }
      }
    },
  },
  plugins: [],
};
