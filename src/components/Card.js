import React from "react"
import "./card.css"

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