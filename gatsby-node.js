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
  

exports.onCreatePage = ({ page, actions }) => {
    const { createPage, deletePage} = actions
    // notice the addition of .*
    const reg = new RegExp('\/(.*)\/(card_details)\/.*')
    if (page.path.match(reg)){
      deletePage(page)
      console.log(page.path.match(reg))
      // notice page.context.language
      page.path = `/card_details/`
      page.matchPath = `/card_details/:id`
      createPage(page)
    }
  }