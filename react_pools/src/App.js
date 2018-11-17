import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

//mycomponents
import Login from './components/Login'
import Pools from './components/Pools'

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      pools:[],
      token:'',
      user:'',
      key:'',
      failed:false,
      loadPools:false
    }
    this.handleSubmit= this.handleSubmit.bind(this)
    this.getInitialInspectionsChecklists=this.getInitialInspectionsChecklists.bind(this)
    this.getWQSampleList=this.getWQSampleList.bind(this)
    this.getPoolItemsTable=this.getPoolItemsTable.bind(this)
    this.handlePoolSampleInfo=this.handlePoolSampleInfo.bind(this)
  }

   getInitialInspectionsChecklists(inspList, header){
     var myPools=[]
     var initialInsp = inspList.filter((insp)=>{
       return insp.type.text=="Initial"
     })

    var inspPromise=initialInsp.map((insp)=>{
      return new Promise(function(resolve, reject){
                 axios.get(`https://apis.accela.com/v4/inspections/${insp.id}/checklists`,header)
               .then(data=>{
                 resolve(data.data.result)
               })
               .catch(error=>{
                 console.log(`error getting checklists for ${insp.id}`)
               })
             })
           })
    Promise.all(inspPromise).then((insp)=>{
      return insp.flat()
    }).then((checklists)=>{
      this.getWQSampleList(checklists, header);
    })
    .catch((error)=>{
      console.log("error resolving inspection promises")
      debugger
    })
  }

  getWQSampleList(lists, header){
    var wqList=lists.filter((list)=> list.guideType.text==="WQ Samples")
    var itemsPromises=wqList.map((list)=>{
      this.setState({
        pools:[... this.state.pools, {"inspection":list.inspectionId}],
      })
      return new Promise(function(resolve, reject){
                 axios.get(`https://apis.accela.com/v4/inspections/${list.inspectionId}/checklists/${list.id}/checklistItems`,header)
               .then(data=>{
                 resolve(data.data.result)
               })
               .catch(error=>{
                 console.log(`error getting checklist items for ${list.id}`)
               })
             })
           })
    Promise.all(itemsPromises).then((items)=>{
       this.getPoolItemsTable(items, header);
    })
  }

  getPoolItemsTable(items, header){
    var test=""
    var poolItems=items.map((set, index)=>{
        return set.filter((item)=> item.checklistItem.text=="Pool")
    })
    var tablePromises=poolItems.map(function(item, index){
      return new Promise(function(resolve, reject){
                 axios.get(`https://apis.accela.com/v4/inspections/${this.state.pools[index]["inspection"]}/checklists/${item[0].checklistId}/checklistItems/${item[0].id}/customTables`, header)
               .then(function(data){
                 resolve(data.data.result)
               }.bind(this))
               .catch(error=>{
                 console.log(`error getting custom tables for ${item.id}`)
               })
             }.bind(this))
    }.bind(this))
    Promise.all(tablePromises).then((table)=>{
      return table.flat()
    }).then((tables)=>{
       return tables.filter((t)=>t.id=="WQ_GWQ_POOL-SAMPLE")
    }).then((poolSamples)=>{
      this.handlePoolSampleInfo(poolSamples)
    })
  }

  handlePoolSampleInfo(poolSamples){
    var myPools=this.state.pools
    poolSamples.forEach((sample, index)=>{
      if(sample.rows){
         myPools[index]= Object.assign(myPools[index],sample.rows[0].fields)
      }
    })
    this.setState({
      pools:myPools,
      loadPools:true
    })
  }




  handleSubmit(username, password){
    var header={
      "headers": {
      "authorization": "YAA_q285TjvsndEmOxVeQQzU1-9WCkNlV5Y-8iLlC2v00SIgalJtwjvTaNrT4ZC7VgvWt_O0RYAeCokILGHNvttGHcXionwA25OO75f5_0boeyxCTJDdxPtr6XW7tJMCGWfuPVLMnL1PY_t-ZSuRauh-frJp339UDrcmHS9nl5BZf9k37vPeUtArk3avS2V7Hp-eUbs4mu1C3BMy964hbgfx3UOtMXBxNT6gzN9kKBYmGna4TSC0mlrwTWtqzu7delgNMowu5GzrGdEMEIGEt90hrOe8cTdoIkLXFWX7YV4Xw_TpUDpNpp_e7IkXoqUVWySCHa0PNSb5RN1rnDSJ1k2ASC_ip987TIq3XRdw82tz8CUVAAF9KCS-TjbP9gvPKfzEk8Fk4j0txrjcmwTKW_JnIKQPUiccXF9aC1INR2Szkmxhzbj7gmhKBQqVwezLwEYnMkoYxWQiMfYg2bajhisyOSVgbMHt5c2kywEPILdA64rPk_bWVxa_zCD1QygYQbZSzTSqyR8MRKEhn-jxPA2",
      "cache-control": "no-cache",
      "postman-token": "59acabbe-f19d-c8a1-f10d-dd1b1918b660"
    }}
    this.setState({
      user:'lwacht@septechconsulting.com'
    })
    axios.get("https://apis.accela.com/v4/records/mine", header)
    .then(function(data){
      return data.data.result.filter((cap)=>{
        return cap.type.type=="WQ"
      })
    }.bind(this))
    .then((waterQualityCaps)=>{
        return waterQualityCaps.map((wqCap)=>{
          return new Promise(function(resolve, reject){
                   axios.get( `https://apis.accela.com/v4/records/${wqCap.id}/inspections`, header)
                   .then(data=>{
                     resolve(data.data.result)
                   })
                   .catch(error=>{
                     console.log(`error getting inspections for ${wqCap.id}`)
                   })
                 })
               })
    }).then((promiseArr)=>{
      Promise.all(promiseArr).then((insp)=>{
        console.log("Got all water quality inspections")
        return insp.flat()
      }).then((wqInspections)=>{
        this.getInitialInspectionsChecklists(wqInspections, header);
      })
      .catch((error)=>{
        console.log("Error resolving inspection promises")
      })
    })
    .catch((error)=>{
      console.log("error getting my caps")
    })
  }




  render() {
    return (
      <div className="App">
      {this.state.loadPools ? <div> <div id="current_user">{this.state.user}</div>
          <Pools pools_list={this.state.pools}/> </div> : <Login handleSubmit={this.handleSubmit} failed={this.state.failed}/>}
      </div>
    );
  }
}

export default App;
