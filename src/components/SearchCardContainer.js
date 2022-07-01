import NewCard from "./NewCard"
import NewCardAuto from "./NewCardAuto"
import React from "react"
import { useState } from "react"
import "./new-card-container.scss"
import { ArrowCircleLeft, ArrowCircleRight } from "@mui/icons-material"
import { Button } from "@material-ui/core"
import {Paper} from "@mui/material"
import { Trans } from "react-i18next";

const SearchCardContainer = (  ) => {
    return (<Paper className={"newCard"}
                sx={{
                    color:"white",
                }}
                elevation={8}>
                    <div style={{margin:"30px"}}><Trans>search</Trans></div>
                    <NewCardAuto></NewCardAuto>
            </Paper>
    )       
}
export default SearchCardContainer