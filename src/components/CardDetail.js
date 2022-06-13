import React from "react"
import axios from "../../authAxios"
import "./card-details.scss"
import { navigate } from "gatsby";
import { Paper } from "@mui/material";
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import LikeButton from "./LikeButton"
import { Box } from "@mui/material";
import {Button} from "@mui/material";
class CardDetail extends React.Component {
  constructor(props){
    super()
    this.state = {
        liked:false,
        card:{},
        connected : false
    }
  }

  async componentDidMount(){
    let cardsReq = null;
    try{
      cardsReq = await axios.get("/4/card-detail/"+this.props.topics_id)
      await this.setState({card:cardsReq.data.details})
    }
    catch{
      navigate("/profile")
    }
    try{
      let favReq = await axios.get("6/fav")
      let myLikes = favReq.data.list.map(like=>like.module_id)
      if(myLikes.includes(cardsReq.data.details.topics_id)){
        console.log("i have liked this card")
        this.setState({liked:true})
      }
      this.setState({connected:true})

    }
    catch(e){
      console.log(e)
    }
  }
  
  render(){
    return <Paper className={"paper"}
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
    </Box>
    </Paper>
  }
}

export default CardDetail