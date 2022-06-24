import React, { useEffect } from "react"
import axios from "../../authAxios"
import Card from "./Card"
import "./card-displayer.scss"
import Button from "@mui/material/Button";
import RefreshIcon from '@mui/icons-material/Refresh';
import {isLoggedIn} from "../services/auth"
import { useState } from "react";
import {navigate} from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next";
const CardDisplayer = (props) => {
  const [displayCards, setDisplayCards] = useState([])
  const language = useI18next().language
  // Use language iso for the routes
  useEffect(()=>{
    getCards()
  }, [])

  async function getCards(){
    let url = ""
    try{
      switch(props.mode){
        case("my-cards"): 
          url = '/6/my-cards?' + "_lang=" + language + "&cnt=" + props.numberOfCards; 
          break;
        case("favorites"): 
          url = "/6/get-fav?" + "_lang=" + language + "&cnt=" + props.numberOfCards; 
          break;
        default: 
          url = "/4/random-cards?" + "_lang=" + language + "&cnt=" + props.numberOfCards; 
          
        }
        const cardsReq = await axios.get(url)
        const cardsFromReq = cardsReq.data.list
        setDisplayCards(convertCardsToHtml(cardsFromReq))
    }
    catch{
      navigate("/profile")
  }  


  function convertCardsToHtml(cards){
    return cards.map(
      (card,index)=>
        <Card myCard={props.mode==="my-cards"} key={card.topics_id} card={card} index={index}></Card>
    ) 
  } 
  }
    const button = <Button style={{position:"absolute",right:"5%", bottom:"5%", fontSize:"xx-large", color:"#333"}} key="button" onClick={getCards}><RefreshIcon/></Button>
    return (<div>
            <div className="flexCardContainer">
              {displayCards}
              </div>
              {button}
          </div>
    )
}

export default CardDisplayer

