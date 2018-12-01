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
      inspections:[],
      pools:[],
      poolsTest:[],
      checklists:[],
      itemIds:[],
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
       return insp.status.value=="Scheduled" && insp.type.value=="Pool Test Results"
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
    var wqList=lists.filter((list)=> list.group==="Pool Test Results")
    var itemsPromises=wqList.map((list)=>{
      this.setState({
        poolsTest:[...this.state.poolsTest, {inspectionId:list.inspectionId, checklistId:list.id}],
        inspections:[... this.state.inspections, list.inspectionId],
        checklists:[...this.state.checklists, list.id]
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
        return set.filter((item)=> item.checklist=="Pool Test Results")
    })
    var tablePromises=poolItems.map(function(item, index){
      this.setState({
        itemIds:[...this.state.itemIds, item[0].id]
      })
      return new Promise(function(resolve, reject){
                 axios.get(`https://apis.accela.com/v4/inspections/${this.state.inspections[index]}/checklists/${item[0].checklistId}/checklistItems/${item[0].id}/customTables`, header)
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
       return tables.filter((t)=>t.id=="POOL_LIC-OUTSIDE.cLAB.cPOOL.cSAMPLES")
    }).then((poolSamples)=>{
      this.handlePoolSampleInfo(poolSamples)
    })
  }

  handlePoolSampleInfo(poolSamples){
    var row
    poolSamples.forEach((sample, index)=>{
      if(sample.rows){
         row= Object.assign({submit:false, read:true, rowId:sample.rows[0].id}, sample.rows[0].fields)
      }else{
        row={
          "submit":false,
          "read":false,
          "rowId":"",
          "Coliform Results":"",
          "Collection Date":"",
          "Valid Results":"",
          "Sample ID":"",
          "E. Coli Results":"",
          "HPC":"",
          "Notes":"",
          "Name":"",
          "Updated":false
        }
      }
      debugger
        this.setState({
          poolsTest:[
            ...this.state.poolsTest.slice(0, index),
            Object.assign({},this.state.poolsTest[index],row),
            ...this.state.poolsTest.slice(index+1)
          ],
          pools:[...this.state.pools, row]
        })
    })
    debugger
    this.setState({
      loadPools:true
    })
  }



  handleSubmit(username, password){
    var header={
      "headers": {
      "authorization": "2GAV4UM-m2Zk7Of8IStbAU_t1-6uE9bmBw6hZxelnYLmlNSZ7HWtF99jZAAhncjjJXh121ztfCgnYJRuGHJHzlTKokN8yQjGwZ_OYmLdeWP637MFQF7p7xYZE0kPeNpCSwpoTJvaBYIXpShhCEHLKWff1h-6uAMk7Q4rOBXbLQgW4jPjAXkNJI9RUK0DvcLl0qrgrFyd759tf4BcDpJJ6hBAMYx_wZoHFpswXaoQ0MSdpq_qaRJyYfvvZkynyI1jrpeG-M-qHTPcoJUgFfZ74kTDPGWB2rbnY-IckyJnJhUy9E0NxHDl_tAXEnEgMvnr01b1xRkYZnKgLfNNKY2nTubV-6CLw9FVm-jIiG2YNwkyRn-EHy_I9R9I_GsUO3oXsTiK1QxAQO1Tnie8DEkLg_w2sIwGFtAUZJJXIuJ3BjLbZMYK93-Jf2cu03-ljzUMnemKxdnka2m_vEcGZcYH5mEKcla45XM07p9x_YaW4Xs1",
      "cache-control": "no-cache",
      "postman-token": "59acabbe-f19d-c8a1-f10d-dd1b1918b660"
    }}
    this.setState({
      user:'lwacht@septechconsulting.com'
    })
    axios.get("https://apis.accela.com/v4/records/mine", header)
    .then(function(data){
      return data.data.result.filter((cap)=>{
        return cap.type.type=="WQ" && cap.type.category=="License" && (cap.status.value != "Closed – Permanent" || cap.status.value !="Closed – Self Closure")
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
        debugger
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
