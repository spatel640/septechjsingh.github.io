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
    let poolName='';
    let poolType='';
    let dash= this.props.identifier.indexOf('-');
    if(dash!= -1){
        poolName = this.props.identifier.slice(0,dash);
        poolName = poolName.substring(0, 16);
        poolType= this.props.identifier.slice(dash);
    }

    return(
      <div className="license-container">
        <button onClick={this.handleClick} className={this.props.current ? "large-buttons current" : "large-buttons"}>
          {poolName ? poolName : this.props.recordId}
          {poolType ? <p>{poolType}</p> : null}
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
