import React from "react";

import Layout from "../components/Layout"
// Import hook
import { useIntl } from "gatsby-plugin-intl"
const Test = (props) => { 
    const intl = useIntl()
    // Use language iso for the routes
    const locale = intl.locale !== "en" ? `/${intl.locale}` : ""

    return(<div>
        <Layout>
        <h1>
        {intl.formatMessage({ id: "cards" })}
        </h1>
        </Layout>
  </div>)}

export default Test;