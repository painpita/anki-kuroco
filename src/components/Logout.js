import { navigate } from "gatsby"
import React from "react"
import {handleLogout} from "../services/auth"
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import { Button} from "@mui/material"
import axios from "../../authAxios";
class Logout extends React.Component {
    constructor(props){
        super()
        this.state = {
            nbCards: 0
        }
        this.getNumberOfCards()
    }

    getNumberOfCards = async () => {
        try{
            let {data:{pageInfo}} = await axios.get("6/card-count")
            console.log(pageInfo)
            this.setState({nbCards : pageInfo.totalCnt})
        }
        catch(e){
            console.log(e)
        }
    }

    handleSubmit = async event => {
        event.preventDefault()
        console.log("logging you out")
        await handleLogout()
        navigate('/')
    }
    render() {
        return(<>
        <ValidatorForm className="formWrapper" onSubmit={this.handleSubmit}>
            <div>
                Logged in as : {this.props.user.email}
            </div>
            <div>
                You have generated {this.state.nbCards} card(s) !
            </div>
            <Button className={"formButton"} type="submit">
                Logout
            </Button>
      </ValidatorForm>
      </>)
    }
}

export default Logout