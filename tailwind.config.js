module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      orange: "var(--color-orange)",
      blue: "var(--color-blue)",
      darkOrange: "var(--color-orange-dark)",
      white: "var(--color-white)",
      red: "var(--color-red)",
      black: "var(--color-black)",
      gray: {
        light: "var(--color-gray-light)",
        dark: "var(--color-gray-dark)",
      },
    },
    extend: {
      height: {
        112: "28rem",
        128: "32rem",
      },
    },
  },
  rePlugins: {
    aspectRatio: false,
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "& > *");
      addVariant("child-hover", "& > *:hover");
    },
    require("@tailwindcss/aspect-ratio"),
  ],
};
