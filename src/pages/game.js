import React from "react";
import Layout from "../components/Layout"
import {graphql} from "gatsby"
import ChallengeContainer from "../components/ChallengeContainer";

const index = () => <div>
  <Layout>
    <ChallengeContainer></ChallengeContainer>
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

