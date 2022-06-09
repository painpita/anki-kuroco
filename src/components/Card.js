import React from "react"
import "./card.css"
import motion from "framer-motion"


class Card extends React.Component {
    constructor(props){
      super()
    }

    styles = {}
   render(){
      return <div className="card">
      
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
    }
  }
  
  export default Card