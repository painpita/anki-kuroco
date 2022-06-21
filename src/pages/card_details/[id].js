import React from "react"
import Layout from "../../components/Layout"
import CardDetail from "../../components/CardDetail"
import {graphql} from "gatsby"

const cardDetail = (location) => {
  console.log(location)
  if(typeof window!=="undefined"){
  return <div>
  <Layout>
    <CardDetail myCard={location.location.state.myCard} topics_id={location.location.state.topics_id} locale={location.location.state.locale}></CardDetail>
  </Layout>
  </div>
  }
  else return
}

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
export default cardDetail;