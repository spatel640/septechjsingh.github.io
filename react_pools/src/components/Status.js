import React, {Component} from 'react'
export default class Status extends Component{

  constructor(props){
    super(props)
    this.handleClick=this.handleClick.bind(this)

  }

  handleClick(e){
    e.preventDefault()
    this.props.updatePoolStatus()
  }





render(){
  return(
  <div className="status-container">
  {this.props.updateStatus == 200 ? <p className="success">Pool Status Updated</p> : null}
    <p>THIS POOL IS CURRENTLY {this.props.status}</p>
    <button onClick={this.handleClick}> {this.props.status== "Open" ? "CLOSE POOL" : "OPEN POOL"}</button>
  </div>

    )

  }

}
