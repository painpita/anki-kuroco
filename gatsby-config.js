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
],
}