import React, { useEffect } from "react"
import axios from "../../authAxios"
import "./card-details.scss"
import { navigate } from "gatsby";
import { Paper } from "@mui/material";
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import LikeButton from "./LikeButton"
import { Box } from "@mui/material";
import {Button} from "@mui/material";
import { render } from "react-dom";
import { useState } from "react";
const CardDetailFunction = (location) => {

    console.log("location")
    console.log(location)
    const [fav, setFav] = useState(false)
    const [card, setCard] = useState({})
    const [connected, setConnected] = useState(false)

  useEffect(async ()=>{
    let cardsReq = null;
    try{
      cardsReq = await axios.get("/4/card-detail/"+this.props.topics_id)
      setCard(cardsReq.data.details)
    }
    catch{
      navigate("/profile")
    }
    try{
      let favReq = await axios.get("6/fav")
      let myLikes = favReq.data.list.map(like=>like.module_id)
      if(myLikes.includes(cardsReq.data.details.topics_id)){
        console.log("i have liked this card")
        setFav(true)
      }
      setConnected(true)

    }
    catch(e){
      console.log(e)
    }
  })
    
    let deleteButton = (this.props.mode==="my-cards" ? <Button>Delete</Button> : <></>)
    render(<Paper className={"paper"}
      sx={{
        backgroundColor:'black',
        color:'white'
      }}
    elevation={8}>
    <Typography variant="" component="h1">
    {this.state.card.ext_1}
    </Typography>
    <Typography variant="" component="h2">
    Meanings : {this.state.card.ext_2}
    </Typography>
    <Typography variant="" component="p">
    Onyomi readings : {this.state.card.ext_3}
    </Typography>
    <Typography variant="" component="p">
    Kunyumi readings : {this.state.card.ext_4}
    </Typography>
    <Typography variant="" component="p">
    Related words : {this.state.card.ext_6}
    </Typography>
    <Box className="buttonsWrapper">
    <LikeButton connected={this.state.connected} liked={this.state.liked} topic={this.state}></LikeButton>
    <Typography variant="" component="p" className='jishoLink'>
      <a target="_blank" rel="noreferrer" href={"https://jisho.org/search/%23kanji%20"+this.state.card.ext_1}><SearchIcon/></a>
    </Typography>
    <Typography class="deleteButtonWrapper">
      {deleteButton}
    </Typography>
    </Box>
    </Paper>
    )
  }


export default CardDetailFunction
