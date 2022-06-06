import React from "react"
import Header from "../components/header"
const Layout = ({ children }) =>
    <div>
        <Header></Header>
        {children}
    </div>  

export default Layout