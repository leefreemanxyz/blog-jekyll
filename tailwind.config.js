module.exports = {
  content: [
    "./_includes/**/*.html",
    "./_layouts/**/*.html",
    "./_posts/*.md",
    "./*.html",
  ],
  theme: {
    colors: {
      brand: {
        dark: "#009688",
        light: "#80cbc4",
      },
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
