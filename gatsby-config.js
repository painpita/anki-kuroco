module.exports = {
    siteMetadata : {
        title: "KuroKanji",
        author: "dimitri@diverta.co",
    },
    plugins: [`gatsby-plugin-sass`,
    {
        resolve: 'gatsby-plugin-manifest',
        options: {
          icon: 'src/favicon.png',
        },
      },
      {
        resolve: `gatsby-plugin-i18n`,
        options: {
          langKeyDefault: 'en',
          langKeyForNull: 'en',
          prefixDefault: false,
          useLangKeyLayout: false,
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
],
}