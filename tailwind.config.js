/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    base: false,
    themes: [
      {
        mytheme: {
          secondary: "#6DD58C",
          primary: "#C4E9CE",
          accent: "#073042",
          neutral: "#073042",
          "base-100": "#ECFBF3",
          info: "#53c0f3",
          success: "#71ead2",
          warning: "#f3cc30",
          error: "#FA7A7A",
        },
      },
    ],
  },
  theme: {
    extend: {
      colors: {
        background: "#ECFBF3",
        secondary: "#6DD58C",
        primary: "#C4E9CE",
        stroke: "#073042",
        red: "#FA7A7A",
        "stroke-gradient": "#01874e",
        "snackbar-error-bg": "#FED0D0",
        "snackbar-success-bg": "#F0F9EB",
        "snackbar-error-text": "#F56C6C",
        "snackbar-success-text": "#67C23A",
        // "snackbar-error-bg": "#ff5555",
        // "snackbar-error-text": "#ffbcbc",
      },
      boxShadow: {
        custom:
          "0 14px 30px rgba(103, 187, 152, .15), 0 4px 4px rgba(103, 187, 152, .05)",
      },
      animation: {
        "custom-fade": "fadeIn 0.5s, fadeOut 0.5s ease-in-out 2.5s",
        "custom-fade-2": "fadeIn2 1s, fadeOut2 0.5s ease-in-out 0.5s",
      },
      keyframes: {
        fadeIn: {
          from: {
            top: 0,
            opacity: 0,
          },
          to: {
            top: "10%",
            opacity: 1,
          },
        },
        fadeOut: {
          from: {
            top: "10%",
            opacity: 1,
          },
          to: {
            top: 0,
            opacity: 0,
          },
        },
        fadeIn2: {
          from: {
            bottom: 0,
            opacity: 0.5,
            scale: 0.5,
          },
          to: {
            bottom: "10%",
            opacity: 1,
            scale: 1,
          },
        },
        fadeOut2: {
          from: {
            opacity: 1,
          },
          to: {
            opacity: 0,
          },
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
