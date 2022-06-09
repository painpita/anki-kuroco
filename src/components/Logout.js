import { navigate } from "gatsby"
import React from "react"
import {handleLogout} from "../services/auth"
class Logout extends React.Component {

    handleSubmit = async event => {
        event.preventDefault()
        console.log("logging you out")
        await handleLogout()
        navigate('/')
    }
    render() {
        return(
            <>
            <form onSubmit = {event => {this.handleSubmit(event)}}>
            <input  value="Logout" type="submit" onSubmit={this.handleSubmit}/>
            </form>
            </>
      )
    }
}

export default Logout