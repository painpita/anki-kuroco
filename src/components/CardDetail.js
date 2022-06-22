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
const CardDetail = (props) =>{
  const [liked, setLiked] = useState(false)
  const [card, setCard] = useState({})
  const [connected, setConnected] = useState(false)
  const {language} = useI18next()
  const [checked, setChecked] = React.useState(false);
  const [displayWarning, setDisplayWarning] = React.useState(false)
  useEffect(()=>{
    const getCard = async () =>{
      let cardsReq = null;
      try{
        //HTTP request using the topics_id that was passed through location
        cardsReq = await axios.get("4/card-detail/"+props.topics_id+"?_lang="+language)
        await setCard(cardsReq.data.details)
      }
      catch(e){
        try{
        if(e.response.status===404){
          //If we get 4O4 it means that the topic is not defined for this language. We get the default language and display a small warning.
          cardsReq = await axios.get("4/card-detail/"+props.topics_id)
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
      await axios.post("6/card-delete/"+props.topics_id)
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


  let deleteButton = (props.myCard ? <Button className="deleteButtonWrapper" onClick={deleteThisCard.bind()}><DeleteIcon/></Button> : <></>)
  let relatedWords = card.ext_6 ? 
  <Typography variant="" component="div" className="examples-wrapper">
    {/*<Trans>related_words</Trans>*/}
      <Collapse className="related_words" orientation="vertical" in={checked} collapsedSize={22}>
        <ul>
          {card.ext_6.split("\n").slice(0,-1).map((elem)=><li>{elem}</li>)}
        </ul>
      </Collapse>
      <Button onClick={collapse}><OpenInFullIcon className="customIcon"></OpenInFullIcon></Button>
  </Typography> 
  : ""
  let warningButton = displayWarning ? <div className="tooltip"><WarningAmberIcon data-hover="Wrong language" className="warningButton"></WarningAmberIcon><div className="tooltiptext"><Trans>wrong_language</Trans></div></div> : ""
  return(
  <Paper className={"paper"}
      sx={{
        backgroundColor:'black',
        color:'white'
      }}
    elevation={8}>
      {warningButton}
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