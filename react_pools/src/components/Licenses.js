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
    var value=e.target.value.replace(/([()[{*+.$^\\|?])/g, '\\$1');
    updatedList = updatedList.filter((item)=>{
     return item.customId.toLowerCase().search(
       value.toLowerCase()) !== -1 || item.identifier.toLowerCase().search(
         value.toLowerCase()) !== -1
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
        <input type="text" id="search-lic" placeholder="Search" onChange={this.filterList}/>
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
