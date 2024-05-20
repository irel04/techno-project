/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        custom: ["Nunito", "sans-serif"],
      },

      colors: {
        primary: "#2E48A5",
        secondary: "#FFDD00",
        "background-color": "#FCFEFF",
        "text-color": "#000",
      },

      boxShadow: {
        custom: "0 4px 6px -1px rgba(0,0,0,.1), 0 2px 4px -2px rgba(0,0,0,.1)",
      },
    },
  },
  plugins: [],
};
