import React from "react"
import "./card.scss"
import { useI18next } from "gatsby-plugin-react-i18next";
import { Fade } from "@mui/material";
import _ from "lodash"
const Card = (props) => {
    const t = useI18next()

    const transformMeanings = (meanings) =>
    {
      meanings = meanings.split(", ")
      return _.capitalize(meanings[0])
    }
    const handleClick = () => {
      t.navigate('/card_details/'+props.card.subject, {state:{myCard:props.myCard,topics_id:props.card.topics_id,locale:"locale"}})
    }
      return(
      <Fade in={true} direction="up" mountOnEnter unmountOnExit {...(true ? { timeout: props.index*200 } : {})}>
      <div role="command" className="card" onClick={handleClick} onKeyDown={handleClick}>
        <div className="content">
          <div className="front">
           { props.card.ext_1}
          </div>
          <div className="back">
            <div className="meanings">
              {transformMeanings(props.card.ext_2)}
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