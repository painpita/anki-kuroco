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
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react"
import {Trans, useI18next} from 'gatsby-plugin-react-i18next';
const CardDetail = (props) =>{
  // Use language iso for the routes
  const [liked, setLiked] = useState(false)
  const [card, setCard] = useState({})
  const [connected, setConnected] = useState(false)
  const {language} = useI18next()
  useEffect(()=>{
    const getCard = async () =>{
      let cardsReq = null;
      try{
        //we remove the first / in locale
        cardsReq = await axios.get("4/card-detail/"+props.topics_id+"?_lang="+language)
        await setCard(cardsReq.data.details)
      }
      catch(e){
        console.log(e)
      }
      try{
        let favReq = await axios.get("6/fav")
        let myLikes = favReq.data.list.map(like=>like.module_id)
        if(myLikes.includes(cardsReq.data.details.topics_id)){
          setLiked(true)
        }
        setConnected(true)
  
      }
      catch(e){
        //navigate("/profile")
      }
    }

    getCard()

  }, [props])


  const deleteThisCard = async () => {
    try{
      await axios.post("6/card-delete/"+props.topics_id)
      navigate("/my-cards")
    }
    catch(e){
      console.log(e)
      navigate("/profile")
    }
  }

  let deleteButton = (props.myCard ? <Button className="deleteButtonWrapper" onClick={deleteThisCard.bind()}><DeleteIcon/></Button> : <></>)

  return(
  <Paper className={"paper"}
      sx={{
        backgroundColor:'black',
        color:'white'
      }}
    elevation={8}>
    <Typography variant="" component="h1">
    {card.ext_1} 
    </Typography>
    <Typography variant="" component="h2">
      <Trans>meanings</Trans> : {card.ext_2}
    </Typography>
    <Typography variant="" component="p">
      <Trans>onyomi_readings</Trans> : {card.ext_3}
    </Typography>
    <Typography variant="" component="p">
      <Trans>kunyomi_readings</Trans> : {card.ext_4}
    </Typography>
    <Typography variant="" component="p">
      <Trans>related_words</Trans> : {card.ext_6}
    </Typography>
    <Box className="buttonsWrapper">
      <Typography variant="" component="div" className='jishoLink'>
        <a target="_blank" rel="noreferrer" href={"https://jisho.org/search/%23kanji%20"+card.ext_1}>
          <SearchIcon/>
        </a>
      </Typography>
      <Typography variant="" component="div" className="likeButtonWrapper">
        <LikeButton connected={connected} liked={liked} topic={card}></LikeButton>
      </Typography>
      <Typography variant="" component="div" className="deleteButtonWrapper">
        {deleteButton}
      </Typography>
    </Box>
    </Paper>
  )
}


export default CardDetail