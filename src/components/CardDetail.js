import React from "react"
import axios from "../../authAxios"
import Card from "./Card"
import "./card-displayer.scss"
import { navigate } from "gatsby";
import { Paper } from "@mui/material";
class CardDisplayer extends React.Component {
  constructor(props){
    super()
    this.state = {
        card:{}
    }
  }
  async componentDidMount(){
    try{
      console.log(this.props)
      let cardsReq = await axios.get("/4/card-detail/"+this.props.topics_id)
      await this.setState({card:cardsReq.data.details})
    }
    catch{
      navigate("/profile")
    }
  }

  render(){

        const card = <div></div>
    return <Paper 
    sx={{
        height: "500px",
        backgroundColor: 'black',
        color:'white'
      }}
    elevation={8}>
    {this.state.card.ext_1}<br></br>
    {this.state.card.ext_2}<br></br>
    {this.state.card.ext_3}<br></br>
    {this.state.card.ext_4}<br></br>

    </Paper>
  }
}

export default CardDisplayer