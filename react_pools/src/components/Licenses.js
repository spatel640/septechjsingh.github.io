import React, {Component} from 'react'
import License from './License.js'
import axios from 'axios'

export default class Licenses extends Component{
  constructor(props){
    super(props)
    this.state={
      loading:true,
      pools:this.props.pools_list
    }

    this.handleCapClick=this.handleCapClick.bind(this)
  }



  handleCapClick(capNumber){
    this.props.getCapInspections(capNumber)
  }



  render(){
    return(
      <div className="licenses">
        {this.props.caps.map((cap,index)=>{

        return<License
        recordId={cap["customId"]}
        capId={cap["id"]}
        onCapClick={this.handleCapClick}
        key={index}
        header={this.state.header}
        />})
      }
      </div>


    )
  }


}
