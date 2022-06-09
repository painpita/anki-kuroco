import React from "react"
import { isLoggedIn, loggedUser } from "../services/auth"
import Login from "./Login"
import Logout from "./Logout"
class Auth extends React.Component {
  constructor(props){
    super()
    this.state = {
      user: null,
    }
  }
  
  async componentDidMount(){
      let user = await isLoggedIn()
      console.log(user)
      this.setState({user})

  }
  render(){
    console.log(this.state.user)
    if(this.state.user===null){
      return <div
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
    }
    else{
      console.log(this.state.user)
      return <> 
        <div>
          Logged in as : {this.state.user.email}
        </div>
        <Logout></Logout>
      </>
    }
  }
}

export default Auth