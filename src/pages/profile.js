import React from "react";
import Layout from "../components/Layout"
import Auth from "../components/Auth"
import {graphql} from "gatsby"

const profile = () => <div>
  <Layout>
    <Auth></Auth>
  </Layout>
  </div>
export const query = graphql`
query($language: String!) {
  locales: allLocale(filter: {language: {eq: $language}}) {
    edges {
      node {
        ns
        data
        language
      }
    }
  }
}
`;
export default profile;