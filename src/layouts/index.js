import React from "react"
import Header from "../components/header"
import { useStaticQuery, graphql } from "gatsby"



const Layout = ({ children }) =>　{
    const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)
    return(
    <>
        <div>
            <Header siteTitle={data.site.siteMetadata?.title || `Title`}/>
            {children}
        </div>  
    </>
    )
    }
export default Layout