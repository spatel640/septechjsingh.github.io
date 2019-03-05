import React, {Component} from 'react'
import Inspection from './Inspection.js'

export default class Inspections extends Component{

  constructor(props){
    super(props)
  }

  render(){
    const inspectionsList=this.props.inspList.map((insp, index)=>{
      return <Inspection
      inspInfo={insp}
      onInspectionClick={this.props.getPoolTestResults}
      inspStatus={insp["status"].value}
      current={this.props.currentInspection == insp["id"] ? true : false}
      key={index}/>
    })
    return(
      <div>
      <p className="licenses-label-description">Click on any week ending to get/add test results</p>
      <ul className="inspections-container">
      {inspectionsList}
      </ul>
      </div>
    )
  }

}
