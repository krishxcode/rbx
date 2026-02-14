/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#ff0033",
          black: "#050505",
          gray: "#1a1a1a",
        },
      },
      fontFamily: {
        sans: ["Rajdhani", "sans-serif"],
        display: ["Teko", "sans-serif"],
      },
    },
  },
  plugins: [],
};
