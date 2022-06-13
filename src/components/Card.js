import React from "react"
import "./card.css"
import { navigate } from "gatsby";
import Grow from '@mui/material/Grow';
import Slide from '@mui/material/Slide';
import { Fade } from "@mui/material";
class Card extends React.Component {
    constructor(props){
      super()
    }

    handleClick = () => {
      navigate('/card_details/'+this.props.card.topics_id, {state:this.props})
    }
    styles = {}
   render(){
      return <Fade in={true} direction="up" mountOnEnter unmountOnExit {...(true ? { timeout: this.props.index*100 } : {})}>
      <div role="select" className="card" onClick={this.handleClick} onKeyDown={this.handleClick}>
      <div className="content">
        <div className="front">
          {this.props.card.ext_1}
        </div>
        <div className="back">
          <div className="meanings">
          {this.props.card.ext_2.split("\n").join("· ")}
          </div>
          <div className="pronunciations">
            {this.props.card.ext_3.split("\n").join("· ")}
            <br></br>
            {this.props.card.ext_4.split("\n").join("· ")}
          </div>
        </div>
      </div>
    </div>
    </Fade>
    }
  }
  
  export default Card