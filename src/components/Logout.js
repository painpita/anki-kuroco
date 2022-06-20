import { navigate } from "gatsby"
import React from "react"
import {handleLogout} from "../services/auth"
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { useIntl } from "gatsby-plugin-intl";
import { Button} from "@mui/material"
import axios from "../../authAxios";
import {useEffect, useState } from "react"
const Logout = (props) => {

    const intl = useIntl()
    // Use language iso for the routes
    const locale = intl.locale !== "en" ? `/${intl.locale}` : ""
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
        console.log("logging you out")
        await handleLogout()
        navigate('/')
    }

        return(<>
        <ValidatorForm className="formWrapper" onSubmit={handleSubmit}>
            <div>
                {intl.formatMessage({ id: "logged_in_as" })} {props.user.email}
            </div>
            <div>
                {intl.formatMessage({ id: "you_have_generated" })} {nbCards} {intl.formatMessage({ id: "you_have_generated_cards" })} !
            </div>
            <Button className={"formButton"} type="submit">
                {intl.formatMessage({ id: "logout" })}
            </Button>
      </ValidatorForm>
      </>)
}

export default Logout