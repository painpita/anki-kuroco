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
          path: `${__dirname}/locales`,
          name: `locale`
        }
      },
      {
        resolve: `gatsby-plugin-react-i18next`,
        options: {
          localeJsonSourceName: `locale`,
          languages: [`en`, `fr`, `jp`],
          defaultLanguage: `en`,
          siteUrl: `http://localhost:8000/`,
          i18nextOptions: {
            interpolation: {
              escapeValue: false 
            },
            //keySeparator: false,
            nsSeparator: false
          },
        }
      }
],
}