/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        primary: "#FC4747",
        secondary: "#5A698F",
        "gray-dark": "#10141E",
        gray: "#161D2F",
        white: "#FFF",
      },

      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
      },

      fontSize: {
        "heading-l": "32px",
        "heading-m": "24px",
        "heading-s": "24px",
        "heading-xs": "18px",
        "body-m": "15px",
        "body-s": "13px",
      },

      fontWeight: {
        light: 300,
        medium: 500,
      },

      screens: {
        xs: "400px",
      },
    },
  },

  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".caret-primary": {
          "caret-color": "#FC4747",
        },
        ".caret-secondary": {
          "caret-color": "#5A698F",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
