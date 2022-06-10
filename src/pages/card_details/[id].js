import React from "react"
import Layout from "../../components/Layout"
import CardDetail from "../../components/CardDetail"

const cardDetail = (props) => {
  console.log(props)
  return <div>
  <Layout>
    <CardDetail topics_id={12}></CardDetail>
  </Layout>
  </div>
}
export default cardDetail;