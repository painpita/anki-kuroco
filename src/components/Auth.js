import React, { useEffect } from "react"
import { isLoggedIn } from "../services/auth"
import Login from "./Login"
import Logout from "./Logout"
import {Paper, Typography} from "@mui/material"
import { useIntl } from "gatsby-plugin-intl";
import { useState } from "react"
const Auth = (props) =>{
  const intl = useIntl()
  // Use language iso for the routes
  const locale = intl.locale !== "en" ? `/${intl.locale}` : ""
  const [user, setUser] = useState(null)
  async function getUser(){
    const getUser = await isLoggedIn({locale:locale})
    setUser(getUser)
  }
  getUser()
    
    if((user==null)|(user==undefined)){
      return(<Paper className={"paper"}>
      <div
    style={{
      display: "flex",
      flex: "1",
      justifyContent: "space-between",
      borderBottom: "1px solid #d1c1e0",
    }}
  >
    <Login></Login>

  </div>
  </Paper>)
    }
    else{
      return (<Paper className={"paper"}>
        <div className="logoutCard">
          <Logout user={user}></Logout>
        </div>
        </Paper>)
    }
}

export default Auth