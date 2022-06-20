module.exports = {
    siteMetadata : {
        title: "KuroKanji",
        author: "dimitri@diverta.co",
    },
    trailingSlash:"always",
    plugins: [`gatsby-plugin-sass`,
    {
        resolve: 'gatsby-plugin-manifest',
        options: {
          icon: 'src/favicon.png',
        },
      },
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `markdown-pages`,
          path: `${__dirname}/src/markdown-pages`,
        },
      },
      `gatsby-transformer-remark`,
      {
        resolve: `gatsby-plugin-intl`,
        options: {
          // Directory with the strings JSON
          path: `${__dirname}/src/intl`,
          // Supported languages
          languages: [`en`, `fr`, `jp`],
          // Default site language
          defaultLanguage: `en`,
          // Redirects to `/en` in the route `/`
          redirect: false,
        },
      },
],
}