/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: "#5C728A",
        primary: "#EDF1F5",
        stroke: "#ADBED2",
        coffee: "#E0D59E",
        brown: "#4D4023",
        yellow: "#EBB62D",
        red: "#8A2C0F",
        whitish: "#FEF4C3",
        peach: "#EF5D5D",
        "peach-complementary": "#FFF5F8",
        "dark-pink": "#E34F85",
        "light-pink": "#FFE0EC",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        custom:
          "0 14px 30px rgba(103, 132, 187, .15), 0 4px 4px rgba(103, 132, 187, .05)",
      },
    },
  },
  plugins: [],
};
