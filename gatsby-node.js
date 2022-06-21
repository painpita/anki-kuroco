const fs = require("fs-extra")
const path = require("path")
exports.onPostBuild = () => {
  console.log("Copying locales")
  fs.copySync(
    path.join(__dirname, "/src/locales"),
    path.join(__dirname, "/public/locales")
  )
}

exports.createPages = async ({ actions }) => {
    // Use language iso for the routes
    //const locale = intl.locale !== "en" ? `/${intl.locale}` : ""
    const { createPage } = actions
    /* if (page.path.match(/^\/.*\/card_details/)) {
      // notice page.context.language
      page.matchPath = `/${locale}/card_details/*`
      createPage(page)
    } */
    createPage({
      path: "/using-dsg",
      component: require.resolve("./src/templates/using-dsg.js"),
      context: {},
      defer: true,
    })
  }
  