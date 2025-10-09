/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lobster: ["Lobster", "sans-serif"],
        shrikhand: ["Shrikhand", "serif"],
        notable: ["Notable", "sans-serif"],
      },
    },
  },
  plugins: [],
};
