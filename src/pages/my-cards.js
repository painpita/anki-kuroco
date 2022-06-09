import React from "react";
import Layout from "../components/Layout"
import CardDisplayer from "../components/CardDisplayer";
const index = () => <div>
  <Layout>
    <CardDisplayer myCards="true" numberOfCards={5}></CardDisplayer>
  </Layout>
  </div>

export default index;