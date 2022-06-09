import React from "react"
import { navigate } from "gatsby"
import { handleLogin, isLoggedIn } from "../services/auth"
class Login extends React.Component {
  state = {
    email: ``,
    password: ``,
    message:  ``,
  }
  
  handleUpdate = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = async event => {
    event.preventDefault()
    try{ 
      await handleLogin(this.state)
    }
    catch(e){
      window.alert(e)
      this.state.message=e
      return
    }
    navigate('/')
  }

  render() {


    return (
      <>
        <form
          method="post"
          onSubmit = {event => {
            this.handleSubmit(event)
          }}
        >
          <label>
            Username
            <input type="text" name="email" onChange={this.handleUpdate} />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              onChange={this.handleUpdate}
            />
          </label>
          <input type="submit" value="Log In" />
        </form>
      </>
    )
  }
}

export default Login
