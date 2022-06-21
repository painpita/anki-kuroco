import React from "react";
import Layout from "../components/Layout"
import CardDisplayer from "../components/CardDisplayer";
import {graphql} from "gatsby"
const index = () => <div>
  <Layout>
    <CardDisplayer mode={"my-cards"} numberOfCards={10}></CardDisplayer>
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
export default index;

