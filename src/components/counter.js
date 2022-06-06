import React from "react"

class Counter extends React.Component {
  constructor(){
    super()
    this.state = {count:0}
  }

  render(){
    return <div>
      <div>{this.props.color}</div>
      {this.state.count}
      <button onClick={()=>this.setState(
        {count : this.state.count + 1}
        )}>
        +
      </button>
      <button onClick={()=>this.setState(
        {count : this.state.count - 1})}>
        -
      </button>
    </div>
  }
}

export default Counter 