// module.exports = {
//   content: ["./pages/**/*.tsx", "./components/**/*.tsx"],
// };

module.exports = {
  content: ["./pages/**/*.tsx", "./components/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        "light-blue": "#075DFF",
        "link-blue": "#0E00A8",
        "wykop-blue": "#367da9",
        "wykop-orange": "#f58237",
      },
      boxShadow: {
        around:
          "0 1px 3px 1px rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      },
      maxWidth: {
        screen: "100vw",
      },
    },
  },
  plugins: [],
};
