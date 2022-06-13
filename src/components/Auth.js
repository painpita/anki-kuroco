import React from "react"
import { isLoggedIn } from "../services/auth"
import Login from "./Login"
import Logout from "./Logout"
import {Paper} from "@mui/material"
class Auth extends React.Component {
  constructor(props){
    super()
    this.state = {
      user: null,
    }
  }
  
  async componentDidMount(){
      let user = await isLoggedIn()
      this.setState({user})
  }

  render(){
    console.log("user : ")
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
    <span>You are not logged in</span>
    <Login></Login>

  </div>
  </Paper>
    }
    else{
      console.log(this.state.user)
      return <Paper className={"paper"}>
        <div>
          Logged in as : {this.state.user.email}
        </div>
        <Logout></Logout>
        </Paper>
    }
  }
}

export default Auth