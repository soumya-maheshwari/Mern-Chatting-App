/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        backgroundColor: "#131324",
        bg2: "#0a1363",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(180deg, #04fafd 5%, #119dff 50%, #030423)",
      },
    },
  },
  plugins: [],
};
