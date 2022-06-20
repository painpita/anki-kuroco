import React from "react"
import "./card.scss"
import { navigate } from "gatsby";
import { Fade } from "@mui/material";
import { useIntl } from "gatsby-plugin-intl";
import { LocalSeeTwoTone } from "@mui/icons-material";
const Card = (props) => {
    const intl = useIntl()
    // Use language iso for the routes
    const locale = intl.locale !== "en" ? `/${intl.locale}` : ""

    const handleClick = () => {
      navigate('/card_details/'+props.card.subject, {state:{myCard:props.myCard,topics_id:props.card.topics_id,locale:locale}})
    }
      return(<Fade in={true} direction="up" mountOnEnter unmountOnExit {...(true ? { timeout: props.index*200 } : {})}>
      <div role="command" className="card" onClick={handleClick} onKeyDown={handleClick}>
      <div className="content">
        <div className="front">
          {props.card.ext_1}
        </div>
        <div className="back">
          <div className="meanings">
          {props.card.ext_2.split("\n").join("· ")}
          </div>
          <div className="pronunciations">
            {props.card.ext_3.split("\n").join("· ")}
            <br></br>
            {props.card.ext_4.split("\n").join("· ")}
          </div>
        </div>
      </div>
    </div>
    </Fade>
    )
  }
  
  export default Card