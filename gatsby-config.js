module.exports = {
    siteMetadata : {
        title: "Anki app",
        author: "dimitri@diverta.co",
        axiosConfig : {
            baseURL: 'https://kurokanji.g.kuroco.app/rcms-api',
            credentials: true,
            withCredentials: true
        }       
    },
    plugins: [`gatsby-plugin-sass`,],
}