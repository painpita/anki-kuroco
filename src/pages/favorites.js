import React from "react";
import Layout from "../components/Layout"
import CardDisplayer from "../components/CardDisplayer";
const favorites = () => <div>
  <Layout>
    <CardDisplayer mode="favorites" numberOfCards={10}></CardDisplayer>
  </Layout>
  </div>

export default favorites;