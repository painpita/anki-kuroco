import React from "react"
import Layout from "../../../components/Layout"
import CardDetail from "../../../components/CardDetail"
const cardDetail = (location) => {
  console.log(location)
  return <div>
  <Layout>
    <CardDetail myCard={location.location.state.myCard} topics_id={location.location.state.topics_id} locale={location.location.state.locale}></CardDetail>
  </Layout>
  </div>
}
export default cardDetail;