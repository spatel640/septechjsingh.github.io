import React, {Component} from 'react'


export default class Inspections extends Component{

  constructor(props){
    super(props)
  }

  render(){
    const inspectionsList=this.props.inspList.map((insp)=>{
      debugger
    })
    return(
      <div>
      {inspectionsList}
      </div>
    )
  }

}
