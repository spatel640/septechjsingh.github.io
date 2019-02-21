import React, {Component} from 'react'


export default class License extends Component{
  constructor(props){
    super(props)
    this.handleClick=this.handleClick.bind(this)
  }

  handleClick(e){
    e.preventDefault()
    this.props.onCapClick(this.props.capId)
  }


  render(){
    return(
      <button onClick={this.handleClick}>
      {this.props.recordId}
      </button>
    )
  }

}
