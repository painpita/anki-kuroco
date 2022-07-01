import React from "react";
import Layout from "../components/Layout"
import SearchCardContainer from "../components/SearchCardContainer";
import {graphql} from "gatsby"
import "./main.scss"

const SearchPage = () => <div>
  <Layout>
    <div className="newCardContainer">
      <SearchCardContainer></SearchCardContainer>
    </div>
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
export default SearchPage;