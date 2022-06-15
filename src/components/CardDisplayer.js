import React from "react"
import axios from "../../authAxios"
import Card from "./Card"
import "./card-displayer.scss"
import Button from "@mui/material/Button";
import RefreshIcon from '@mui/icons-material/Refresh';
import {isLoggedIn} from "../services/auth"
class CardDisplayer extends React.Component {
  data;
  constructor(props){
    super()
    this.state = {
      cards:[]
    }
  }
  async componentDidMount(){
    let cardsReq = null
    let cards = []
    let url = ""
    try{
      switch(this.props.mode){
        case("my-cards"): 
          url = "/6/my-cards?cnt="; 
          break;
        case("favorites"): 
          url = "/6/get-fav?cnt="; 
          break;
        default: 
          url = "/4/random-cards?cnt=";
        }
        cardsReq = await axios.get(url+this.props.numberOfCards)
        cards = cardsReq.data.list
    }
    catch{
      isLoggedIn()
      this.componentDidMount()
    }

    this.setState({ cards : await cards })
  }

  render(){
    const cards = 
      this.state
        .cards
          .map(
            (card,index)=>
              <Card myCard={this.props.mode==="my-cards"} key={card.topics_id} card={card} index={index}></Card>
          )
    const button = <Button style={{position:"absolute",right:"5%", bottom:"5%", fontSize:"xx-large", color:"#333"}} key="button" onClick={()=>this.componentDidMount()}><RefreshIcon/></Button>
    return <div>
            <div className="flexCardContainer">
              {cards}
              </div>
              {button}
          </div>
  }
}

export default CardDisplayer