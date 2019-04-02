import React, {Component} from 'react'
import License from './License.js'
import axios from 'axios'

export default class Licenses extends Component{
  constructor(props){
    super(props)
    this.state={

      loading:true,
      pools:this.props.caps
    }
    this.filterList=this.filterList.bind(this)
    this.handleCapClick=this.handleCapClick.bind(this)

  }





  handleCapClick(capNumber){
    this.props.getCapInspections(capNumber)
  }

  filterList(e){
    var updatedList= this.props.caps;
    updatedList = updatedList.filter((item)=>{
     return item.customId.toLowerCase().search(
       e.target.value.toLowerCase()) !== -1 || item.identifier.toLowerCase().search(
         e.target.value.toLowerCase()) !== -1
   });
   this.setState({
     pools:updatedList
   })
  }



  render(){
    return(
      <div className="licenses">
      <p className="licenses-label">AUTHORIZED POOLS</p>
      <form>
        <fieldset className="form-group">
        <input type="text" placeholder="Search" onChange={this.filterList}/>
        </fieldset>
      </form>
      <p className="licenses-label-description">Click on a pool license number to access submission weeks</p>
        {this.state.pools.map((cap,index)=>{
        return<License
        recordId={cap["customId"]}
        capId={cap["id"]}
        onCapClick={this.handleCapClick}
        identifier={cap.identifier}
        key={index}
        current={cap["id"] == this.props.current ? true : false}
        myInspections={this.props.inspList}
        getPoolTestResults={this.props.getPoolTestResults}
        currentInspection={this.props.currentInspection}
        header={this.props.header}
        />})
        }
      </div>


    )
  }


}
