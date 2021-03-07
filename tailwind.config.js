module.exports = {
  purge: [
    "./_includes/**/*.html",
    "./_layouts/**/*.html",
    "./_posts/*.md",
    "./*.html",
  ],
  darkMode: false,
  theme: {
    colors: {
      brand: {
        dark: "#009688",
        light: "#80cbc4",
      },
    },
    extend: {},
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
