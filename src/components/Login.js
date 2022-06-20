import React from "react"
import { navigate } from "gatsby"
import { handleLogin, isLoggedIn } from "../services/auth"
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Button, Typography }  from "@mui/material";
import { useIntl } from "gatsby-plugin-intl";
import {useState} from "react"
import "./auth.scss"
const Login = (props) =>{
  const intl = useIntl()
  // Use language iso for the routes
  const locale = intl.locale !== "en" ? `/${intl.locale}` : ""
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
    navigate(locale)
  }

    return (
      <div className="formWrapper">
         <Typography>{intl.formatMessage({ id: "not_logged_in" })}</Typography>
          <ValidatorForm className="formWrapper" onSubmit={handleSubmit}>
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
          {intl.formatMessage({ id: "login" })}
        </Button>
        </ValidatorForm>
      </div>
    )
}

export default Login
