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
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import Collapse from '@mui/material/Collapse';
import Swal from 'sweetalert2';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import {getTopicsId, setTopicsId} from "../services/changeLangKeepTopicsId"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReactCountryFlag from "react-country-flag";
import { Link } from "gatsby-plugin-react-i18next";
import _ from "lodash"
const CardDetail = (props) =>{
  const [liked, setLiked] = useState(false)
  const [card, setCard] = useState({})
  const [connected, setConnected] = useState(false)
  const {language} = useI18next()
  const [checked, setChecked] = React.useState(false);
  const [displayWarning, setDisplayWarning] = React.useState(false)

  // When changing the language while inspecting card details, there was an error
  // It happened because changing language would reset the props.
  // To fix this, we created a "store" that keeps the value between the 2 lang pages
  let getThisTopicId = props.topics_id;
  getThisTopicId===undefined ? getThisTopicId= getTopicsId() : setTopicsId(getThisTopicId)

  useEffect(()=>{
    const getCard = async () =>{
      let cardsReq = null;
      try{
        //HTTP request using the topics_id that was passed through location
        cardsReq = await axios.get("4/card-detail/"+getThisTopicId+"?_lang="+language)
        await setCard(cardsReq.data.details)
      }
      catch(e){
        try{
        if(e.response.status===404){
          //If we get 4O4 it means that the topic is not defined for this language. We get the default language and display a small warning.
          cardsReq = await axios.get("4/card-detail/"+getThisTopicId)
          setDisplayWarning(!displayWarning)

          //using a setstate function to let the interface update asynchronously
          await setCard(cardsReq.data.details)
        }
        }
        catch(e){
          Swal.fire({
            title: 'Error !',
            text: 
            e.message,
            icon: 'error',
            confirmButtonText: ':('
          })     
        }
      }
      try{
        //Fetch all the likes for user, then set a variable if the topics_id is contained in the likes array. Might be a better way to do this.
        let favReq = await axios.get("6/fav")
        let myLikes = favReq.data.list.map(like=>like.module_id)
        if(myLikes.includes(cardsReq.data.details.topics_id)){
          setLiked(true)
        }
        //If this request did not return an error it means that the user is connected. We can set connected to true to let the user like the card.
        setConnected(true)
      }
      catch(e){
        //navigate("/profile")
      }
    }
    //use get card immediately when component is loaded to set the state
    getCard()
  }, [props])


  const deleteThisCard = async () => {
    try{
      await axios.post("6/card-delete/"+getThisTopicId)
      navigate("/my-cards")
    }
    catch(e){
      console.log(e)
      navigate("/profile")
    }
  }

  const collapse = () =>{
    setChecked(!checked)
  }

  const navigateBack = () => {
    navigate(window.history.back())
  }

  const splitAndCapitalize = (meanings) =>
  {
    if(meanings===undefined) return
    meanings = meanings.split(", ")
    meanings = meanings.map(elem=>{
      return _.capitalize(elem)
    })
    meanings = [meanings].join("· ")
    return meanings
  }

  const flags = {
    en : <ReactCountryFlag countryCode="GB" />,
    fr : <ReactCountryFlag countryCode="FR" />,
    ja : <ReactCountryFlag countryCode="JP" />
  }

  let deleteButton = (props.myCard ? <Button className="deleteButtonWrapper" onClick={deleteThisCard.bind()}><DeleteIcon/></Button> : <></>)
  let relatedWords = card.ext_6 ? 
  <Typography variant="" component="div" className="examples-wrapper">
      <Collapse className="related_words" orientation="vertical" in={checked} collapsedSize={22}>
        <ul>
          {card.ext_6.split("\n").slice(0,-1).map((elem)=><li>{elem}</li>)}
        </ul>
      </Collapse>
      <Button onClick={collapse}><OpenInFullIcon className="customIcon"></OpenInFullIcon></Button>
  </Typography> 
  : ""
  let requestTranslation = displayWarning ? <Link to={`/translation_request/${card.topics_id}`}><Trans>wrong_language</Trans><span className="requestTranslation">{flags[language]}</span></Link> : <span></span>
  return(
  <Paper className={"paper"}
      sx={{
        backgroundColor:'black',
        color:'white'
      }}
    elevation={8}>
    <div className="cardHeader">
        <Button onClick={navigateBack}><ArrowBackIcon /></Button>
        {requestTranslation}
    </div>
    <Typography variant="" component="h1">
    {card.ext_1} 
    </Typography>
    <Typography variant="" component="h2">
      <Trans>meanings</Trans> : {splitAndCapitalize(card.ext_2)}
    </Typography>
    <Typography variant="" component="p">
      <Trans>onyomi_readings</Trans> : {card.ext_3}
    </Typography>
    <Typography variant="" component="p">
      <Trans>kunyomi_readings</Trans> : {card.ext_4}
    </Typography>
    <Typography variant="" component="p"><Trans>difficulty_level</Trans> : {card.contents_type_nm=="Cards" ? "N/A" : card.contents_type_nm}</Typography>
    {relatedWords}
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