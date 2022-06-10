import React from "react"
import axios from "../../authAxios"
import Card from "./Card"
import "./card-displayer.scss"
import { navigate } from "gatsby";
import Button from "@mui/material/Button";
import RefreshIcon from '@mui/icons-material/Refresh';
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
    try{
      if(this.props.myCards) cardsReq = await axios.get("/6/my-cards?cnt="+this.props.numberOfCards)
      else cardsReq = await axios.get("/4/random-cards?cnt="+this.props.numberOfCards)
      cards = cardsReq.data.list
    }
    catch{
      navigate("/profile")
    }

    this.setState({ cards : await cards })
  }

  render(){
    const cards = 
      this.state
        .cards
          .map(
            card=>
              <Card key={card.topics_id} card={card} ></Card>
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