import React from "react"
import axios from "../../authAxios"
import Card from "./Card"
import { Grow, FormControlLabel, Switch } from "@mui/material";
import "./card-displayer.scss"
import { on } from "events";
import { navigate } from "gatsby";
import Button from "@mui/material/Button";
import RefreshIcon from '@mui/icons-material/Refresh';
class CardDisplayer extends React.Component {
  data;
  constructor(){
    super()
    this.state = {
      cards:[]
    }
  }

  refreshKanjis(){
    console.log("refreshing")
    navigate('/')
  }
  async componentDidMount(){
    let numberOfCards=8
    const cardReq = await axios.get("/4/random-cards?cnt="+numberOfCards)
    const cards = cardReq.data.list
    this.setState({ cards : cards })
  }

  render(){
    const cards = 
      this.state
        .cards
          .map(
            card=>
              <Card key={card.topics_id} card={card} ></Card>
          )
    const button = <Button key="button" onClick={()=>this.componentDidMount()}><RefreshIcon/></Button>
    return <div className="flexCardContainer">
      {cards}
      {button}
      </div>
  }
}

export default CardDisplayer