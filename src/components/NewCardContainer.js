import NewCard from "./NewCard"
import NewCardAuto from "./NewCardAuto"
import React from "react"
import { useState } from "react"
import "./new-card-container.scss"
import { ArrowCircleLeft, ArrowCircleRight } from "@mui/icons-material"
import { Button } from "@material-ui/core"
import {Paper} from "@mui/material"
import { Trans } from "react-i18next";

const NewCardContainer = (  ) => {

    const [auto,setAuto] = useState(false)
    const changeInputType = () => {
        setAuto(!auto)
    }
    /* <Button className="cardSelector" onClick={changeInputType}><ArrowCircleLeft></ArrowCircleLeft></Button>
<Button className="cardSelector" onClick={changeInputType}><ArrowCircleLeft></ArrowCircleLeft></Button> */

    return (<Paper className={"newCard"}
                sx={{
                    color:"white",
                }}
                elevation={8}>
                    <div className="formSelector">
                        <Button style={auto ? {color : "#a6a6a6"} : {color : "white"}} onClick={()=>setAuto(false)}><Trans>create_new</Trans></Button>
                        <Button style={auto ? {color : "white"} : {color : "#a6a6a6"}} onClick={()=>setAuto(true)}><Trans>create_new_automatic</Trans></Button>
                    </div>
                   {auto ? <NewCardAuto></NewCardAuto> : <NewCard auto={auto}></NewCard>}
            </Paper>
)
}

export default NewCardContainer