import React, {Component} from 'react'
import Inspections from './Inspections.js'

import '../index.css';

export default class License extends Component{
  constructor(props){
    super(props)
    this.state={
      showInspections: false,
    }
    this.handleClick=this.handleClick.bind(this)
  }


  componentWillReceiveProps(nextProps){
    if(nextProps.current){
      this.setState({
        showInspections:true
      })
    }else{
      this.setState({
        showInspections:false
      })
    }
  }

  handleClick(e){
    e.preventDefault()
    this.props.onCapClick(this.props.capId)
  }


  render(){
    return(
      <div className="license-container">
        <button onClick={this.handleClick} className={this.props.current ? "large-buttons current" : "large-buttons"}>
          {this.props.identifier ? this.props.identifier : this.props.recordId}
        </button>
          {this.state.showInspections ?
            <Inspections inspList={this.props.myInspections}
            currentRecord={this.state.currentLicense}
            currentInspection={this.props.currentInspection}
            getPoolTestResults={this.props.getPoolTestResults}
            header={this.state.header}/> : null}
      </div>
    )
  }

}
