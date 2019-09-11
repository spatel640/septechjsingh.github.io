import React,{Component} from 'react'



export default class Inspection extends Component{

constructor(props){
  super(props)
  this.handleClick=this.handleClick.bind(this)
}


handleClick(e){
  e.preventDefault()
  this.props.onInspectionClick(this.props.inspInfo["id"], this.props.inspStatus, this.props.inspInfo.scheduleDate)
}


render(){
  return(
    <li><button onClick={this.handleClick} className={this.props.current ? "inspection selected" : "inspection"}>
     Week ending {this.props.inspInfo["scheduleDate"]}</button>
    </li>
  )
}

}
