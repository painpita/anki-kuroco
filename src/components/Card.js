import React from "react"
import "./card.css"
import Box from '@mui/material/Box';
import RCard from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';



class Card extends React.Component {
    constructor(props){
      super()
    }
  
    render(){
      return <div className="card">
      <div className="content">
        <div className="front">
          {this.props.card.ext_1}
        </div>
        <div className="back">
          <div className="meanings">
          {this.props.card.ext_2}
          </div>
          <div className="pronunciations">
            {this.props.card.ext_3}
            {this.props.card.ext_4}
          </div>
        </div>
      </div>
    </div>
    }
  }
  
  export default Card