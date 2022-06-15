import React from "react"
import { navigate } from "gatsby"
import { handleLogin, isLoggedIn } from "../services/auth"
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Button, Typography }  from "@mui/material";
import "./auth.scss"
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
  defaultValues = {
    email:"",
    password:""
  };


  render() {


    return (
      <div className="formWrapper">
         <Typography>You are not logged in</Typography>
          <ValidatorForm className="formWrapper" onSubmit={this.handleSubmit}>
          <TextValidator
              className="email" 
              label="email" 
              type="text"
              name="email"
              variant="outlined" 
              validators={['required',"isEmail"]}
              errorMessages={['This field is required',"Should be email"]}
              value={this.state.email}
              onChange={this.handleUpdate}
            />
          <TextValidator
              className="password" 
              label="password" 
              type="password"
              name="password"
              variant="outlined" 
              validators={['required']}
              errorMessages={['This field is required']}
              value={this.state.password}
              onChange={this.handleUpdate}
            />
          <Button className={"formButton"} type="submit">
          Login
        </Button>
        </ValidatorForm>
      </div>
    )
  }
}

export default Login
