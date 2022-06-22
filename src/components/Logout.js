import { navigate } from "gatsby"
import React from "react"
import {handleLogout} from "../services/auth"
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Button} from "@mui/material"
import axios from "../../authAxios";
import {useEffect, useState } from "react"
import {Trans, useTranslation} from 'gatsby-plugin-react-i18next';

const Logout = (props) => {

    // Use language iso for the routes
    const [nbCards, setNbCards] = useState(0)

    useEffect(()=>{
        const getNumberOfCards = async () => {
            try{
                let {data:{pageInfo}} = await axios.get("6/card-count")
                setNbCards(pageInfo.totalCnt)
            }
            catch(e){
                console.log(e)
            }
    
        }
        getNumberOfCards()

    },[])

    const handleSubmit = async event => {
        event.preventDefault()
        await handleLogout()
    }

        return(<>
        <ValidatorForm className="formWrapper" onSubmit={handleSubmit}>
            <div>
                <Trans>logged_in_as</Trans> {props.user.email}
            </div>
            <div>
                <Trans>you_have_generated</Trans> {nbCards} <Trans>you_have_generated_cards</Trans> !
            </div>
            <Button className={"formButton"} type="submit">
                <Trans>logout</Trans>
            </Button>
      </ValidatorForm>
      </>)
}

export default Logout