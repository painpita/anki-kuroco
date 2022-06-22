import React from "react";
import Layout from "../components/Layout"
import NewCardContainer from "../components/NewCardContainer";
import {graphql} from "gatsby"

const newPage = () => <div>
  <Layout>
    <NewCardContainer></NewCardContainer>
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
export default newPage;