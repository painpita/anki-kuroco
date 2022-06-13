import React from "react"
import Layout from "../../components/Layout"
import CardDetail from "../../components/CardDetail"

const cardDetail = (props) => {
  return <div>
  <Layout>
    <CardDetail topics_id={props.id}></CardDetail>
  </Layout>
  </div>
}
export default cardDetail;