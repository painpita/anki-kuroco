import React, { useEffect } from "react"
import axios from "../../authAxios"
import Card from "./Card"
import "./card-displayer.scss"
import Button from "@mui/material/Button";
import RefreshIcon from '@mui/icons-material/Refresh';
import { useState } from "react";
import {navigate} from "gatsby"
import { useI18next } from "gatsby-plugin-react-i18next";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { MenuItem, Select, Box, FormControl, InputLabel } from "@mui/material";
const CardDisplayer = (props) => {
  const [displayCards, setDisplayCards] = useState([])
  const [pageID, setPageID] = useState(1)
  const [totalPageCnt, setTotalPageCnt] = useState(1)
  const [filterGrade, setFilterGrade] = useState(0)
  const language = useI18next().language
  // Use language iso for the routes
  useEffect(()=>{
    getCards()
  }, [filterGrade, pageID])

  async function getCards(){
    let url = ""
    console.log(filterGrade)
    try{
      switch(props.mode){
        case("my-cards"): 
          url = `/6/my-cards?_lang=${language}&cnt=${props.numberOfCards}&pageID=${pageID}`
          break;
        case("favorites"): 
          url = `/6/get-fav?_lang=${language}&cnt=${props.numberOfCards}&pageID=${pageID}`

          break;
        default: 
          url = `/4/random-cards?_lang=${language}&cnt=${props.numberOfCards}`
        }
        if(filterGrade!==0) url=url+`&filter=contents_type%3D${filterGrade}`;          
        const cardsReq = await axios.get(url)
        const cardsFromReq = cardsReq.data.list
        setTotalPageCnt(cardsReq.data.pageInfo.totalPageCnt)
        setDisplayCards(convertCardsToHtml(cardsFromReq))
    }
      catch(e){
        console.log(e)
        navigate("/profile")
    }  

    function convertCardsToHtml(cards){
      return cards.map(
        (card,index)=>
          <Card myCard={props.mode==="my-cards"} key={card.topics_id} card={card} index={index}></Card>
      ) 
    } 
  }
  const navigateCards = (event, direction) => {
    console.log(direction)
    if((pageID===1&&direction===-1) || (pageID===totalPageCnt&&direction===1)) return 
    setPageID(pageID+direction)
  }

  const handleChange = (event) => {
    console.log("handling change")
    console.log(event.target.value)
    setFilterGrade(event.target.value);
  };


    const nextButton = props.mode!=="validated" ? <Button onClick={(e)=>navigateCards(e,1)} style={{fontSize:"xx-large", color:"#333"}}><ArrowForwardIcon /></Button> : ""
    const prevButton = props.mode!=="validated" ? <Button onClick={(e)=>navigateCards(e,-1)} style={{fontSize:"xx-large", color:"#333"}}><ArrowBackIcon /></Button> : ""
    const pageDisplay = props.mode!=="validated" ? <div style={{position:"absolute",right:"5%", bottom:"5%", fontSize:"xx-large", color:"#333"}}>  {pageID} / {totalPageCnt} </div> :""
    const button = props.mode==="validated" ? <Button style={{position:"absolute",right:"10%", bottom:"5%", fontSize:"large", color:"#333"}} key="button" onClick={getCards}><RefreshIcon/></Button> : ""

    const filterBlock = <Box sx={{ minWidth: 120 }}>
    <FormControl fullWidth>
      <InputLabel id="filter-grade-select-label">Grade</InputLabel>
      <Select
        labelId="filter-grade-label"
        id="filter-grade-select"
        value={filterGrade}
        label="Grade"
        onChange={handleChange}
      >
        <MenuItem value={0}>All</MenuItem>
        <MenuItem value={16}>1</MenuItem>
        <MenuItem value={17}>2</MenuItem>
        <MenuItem value={18}>3</MenuItem>
        <MenuItem value={19}>4</MenuItem>
        <MenuItem value={20}>5</MenuItem>
        <MenuItem value={21}>6</MenuItem>

      </Select>
    </FormControl>
  </Box>
    return (<div className="cardContainerWrapper">
            {prevButton}
            <div className="flexCardContainer">
              {displayCards}
            </div>
              {nextButton}
              {button}
              {pageDisplay}
              {filterBlock}
          </div>
    )


}

export default CardDisplayer

