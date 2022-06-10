import React from "react"
import Layout from "../components/Layout"
import CardDetail from "../components/CardDetail"

const cardDetail = (location, id) => {
  return <div>
  <Layout>
    <CardDetail topics_id={location.location.state.card.topics_id}></CardDetail>
  </Layout>
  </div>
}
export default cardDetail;