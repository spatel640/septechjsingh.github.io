import React,{Component} from 'react'



export default class Inspection extends Component{

constructor(props){
  super(props)
  this.handleClick=this.handleClick.bind(this)
}

handleClick(e){
  e.preventDefault()
  this.props.onInspectionClick(this.props.inspInfo["id"])
}


render(){
  return(
    <button onClick={this.handleClick} className="mediumButtons">
    Inspection {this.props.inspInfo["id"]}
    </button>
  )
}

}
