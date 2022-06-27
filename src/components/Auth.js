import React, { useEffect } from "react"
import { isLoggedIn } from "../services/auth"
import Login from "./Login"
import Logout from "./Logout"
import {Paper, Typography} from "@mui/material"
import { useState } from "react"
const Auth = (props) =>{
  // Use language iso for the routes
  const [user, setUser] = useState(null)
  async function getUser(){
    const getUser = await isLoggedIn()
    setUser(getUser)
  }

  useEffect(()=>{
    getUser()
  },[])    

    if((user==null)|(user==undefined)){
      return(<Paper className={"paper"}>
      <div
    style={{
      display: "flex",
      flex: "1",
      justifyContent: "space-between",
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