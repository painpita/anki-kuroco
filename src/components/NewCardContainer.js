import NewCard from "./NewCard"
import NewCardAuto from "./NewCardAuto"
import React from "react"
import { useState } from "react"
import { Button } from "@mui/material"
import "./new-card-container.scss"
import { ArrowCircleLeft, ArrowCircleRight, ArrowRightCircle } from "@mui/icons-material"
const NewCardContainer = (  ) => {

    const [auto,setAuto] = useState(false)
    const [direction, setDirection] = useState("left")
    const changeInputType = () => {
        setAuto(!auto)
    }
    
    return (
        <div className="newCardContainer">
            <Button className="cardSelector" onClick={changeInputType}><ArrowCircleLeft></ArrowCircleLeft></Button>
                {auto ? <NewCardAuto></NewCardAuto> : <NewCard></NewCard>}
            <Button className="cardSelector" onClick={changeInputType}><ArrowCircleRight></ArrowCircleRight></Button>
        </div>
    )
}

export default NewCardContainer