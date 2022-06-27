module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  pageLoadTimeout: 120000,
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
};
