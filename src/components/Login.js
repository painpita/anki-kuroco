import React from "react"
import { handleLogin, isLoggedIn } from "../services/auth"
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Button, Typography }  from "@mui/material";
import {useState} from "react"
import {Trans, useI18next} from 'gatsby-plugin-react-i18next';

import "./auth.scss"
const Login = (props) =>{

  const {navigate} = useI18next()

  // Use language iso for the routes
  const [loginInfo, setLoginInfo] = useState({
    email: ``,
    password: ``,
    message:  ``,
  })

  const handleUpdate = event => {
    setLoginInfo({
      ...loginInfo,
      [event.target.name] : event.target.value
    })
    console.log(loginInfo)

  }

  const handleSubmit = async event => {
    event.preventDefault()
    try{ 
      await handleLogin(loginInfo)
    }
    catch(e){
      window.alert(e)
      loginInfo.message=e
      return
    }
    navigate("/")
  }

    return (
      <div className="formWrapper">
          <ValidatorForm className="formWrapper" onSubmit={handleSubmit}>
          <Typography><Trans>not_logged_in</Trans></Typography>

          <TextValidator
              className="email" 
              label="email" 
              type="text"
              name="email"
              variant="outlined" 
              validators={['required',"isEmail"]}
              errorMessages={['This field is required',"Should be email"]}
              value={loginInfo.email}
              onChange={handleUpdate}
            />
          <TextValidator
              className="password" 
              label="password" 
              type="password"
              name="password"
              variant="outlined" 
              validators={['required']}
              errorMessages={['This field is required']}
              value={loginInfo.password}
              onChange={handleUpdate}
            />
          <Button className={"formButton"} type="submit">
          <Trans>login</Trans>
        </Button>
        </ValidatorForm>
      </div>
    )
}

export default Login
