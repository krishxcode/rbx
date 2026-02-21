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
        // 🔥 RBX COLORS DIRECT
        "rbx-red": "#ff0000",
        "rbx-dark": "#050505",
        "rbx-panel": "#0a0a0a",
      },
      fontFamily: {
        sans: ["Rajdhani", "sans-serif"],
        display: ["Teko", "sans-serif"],
      },
    },
  },
  plugins: [],
};
