/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // primary: "#5B27EC",
        primary: "var(--color-primary)",
        secondary: "#EAB308",
        accent: "#14B8A6",
        background: "#F3F4F6",
        hover: "--color-primary-hover"
        // hover: "#774BEE"
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
