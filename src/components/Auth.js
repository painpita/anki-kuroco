import React from "react"
import { isLoggedIn } from "../services/auth"
import Login from "./Login"
import Logout from "./Logout"
import {Paper, Typography} from "@mui/material"
class Auth extends React.Component {
  constructor(props){
    super()
    this.state = {
      user: null,
    }
  }
  
  async componentDidMount(){
      let user = await isLoggedIn()
      this.setState(await {user})
  }

  render(){
    console.log(this.state.user)
    if((this.state.user==null)|(this.state.user==undefined)){
      return <Paper className={"paper"}>
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
  </Paper>
    }
    else{
      return <Paper className={"paper"}>
        <div className="logoutCard">
          <Logout user={this.state.user}></Logout>
        </div>
        </Paper>
    }
  }
}

export default Auth