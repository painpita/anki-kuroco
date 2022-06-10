import React from "react";
import Layout from "../components/Layout"
import CardDisplayer from "../components/CardDisplayer";
const index = () => <div>
  <Layout>
    <CardDisplayer numberOfCards={10}></CardDisplayer>
  </Layout>
  </div>

export default index;