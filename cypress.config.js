module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
      webpackConfig: require('./node_modules/gatsby/dist/utils/webpack.config.js'),
    },
  },
};
