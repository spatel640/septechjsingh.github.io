import React, { Component } from 'react';
import './App.css';
import axios from 'axios'


//mycomponents
import Login from './components/Login'
import Licenses from './components/Licenses'
import Inspections from './components/Inspections.js'
import Pools from './components/Pools.js'

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      myCaps:[],
      myInspections:[],
      token:'',
      user:'',
      currentLicense:'',
      failed:false,
      loadPools:false,
      currentInspection:'',
      currentChecklist:'',
      currentTable:[],
      currentItemId: '',
      blankRows:[],
      header:{
        "headers": {
        "authorization": "QAPMCXf26UDu1K0ogS2HlZIjf4x3ufAhO9N6EJOUO3OhDSRvdnv8qaNTx8vx-V1hlI_CCnJG1s4mpug0gXRJb9WXDz_374zIdA1CaDJiywFVMa20PFXUkdeYg_wjBH3fwIR25A1gA8Zk-HnuPffSzHvy3ZtAaQryIPP1FFFGpSfMi-122GpvlFTRLOKcLVOPIbb_9JW3UcOvFaQL4cY2VOiifSKflWkfSuux9Wkn33pukdB7ujhi7Gv5PGVoMepDPxCGJff4yQk1mL_ihH3Lyhz8L59kgNrmewKYF7Qz8AfgkunLcnPt2pdQ_U7nJH_6sV1symCdQHNF6swIdFtIumLRjbJcYZ6nEaXZagrbsAG9zZ_d6ypwybAEXT269Qusw_mHkMby1uGDwoyuFEOv1Td0fKOWydQ67bRap1tHF9RgKyW37s_oqwCIbsksw6LkhnrEChMq7lsepBtVvetU5g2",
        "cache-control": "no-cache",
        "postman-token": "59acabbe-f19d-c8a1-f10d-dd1b1918b660"
      }}
    }
    this.handleSubmit= this.handleSubmit.bind(this)
    this.getPoolInspections=this.getPoolInspections.bind(this)
    this.getPoolTestResults=this.getPoolTestResults.bind(this)
    this.getPoolTestResultsChecklistItems= this.getPoolTestResultsChecklistItems.bind(this)
    this.submitResults=this.submitResults.bind(this)
    this.handleResponse=this.handleResponse.bind(this)
  }





  handleSubmit(username, password){
    this.setState({
      user:'lwacht@septechconsulting.com'
    })
    axios.get("https://apis.accela.com/v4/records/mine", this.state.header)
    .then(function(data){
      return data.data.result.forEach(function(cap){
        if (cap.type.type=="WQ" && cap.type.category=="License"){
          this.setState({
            myCaps:[...this.state.myCaps, cap]
          })
        }
      }.bind(this))
    }.bind(this))
    .then(function(){
      this.setState({
        loadPools:true
      })
    }.bind(this))
    .catch((error)=>{
      console.log("error getting my caps")
    })
  }

  getPoolInspections(capNumber){
    this.setState({
      currentLicense:capNumber,
      currentChecklist:null,
      myInspections:Object.assign([], []),
      currentTable:Object.assign([], []),
      response:''
    })
    axios.get(`https://apis.accela.com/v4/records/${capNumber}/inspections`, this.state.header)
    .then(function(data){
      this.setState({
        myInspections:data.data.result
      })
    }.bind(this))
    .catch((error)=>{
      console.log(`Error getting inspections for ${capNumber}`)
    })
  }

  getPoolTestResults(inspId){
    this.setState({
      currentInspection:inspId,
      currentItemId:''
     })
    axios.get(`https://apis.accela.com/v4/inspections/${inspId}/checklists`,this.state.header)
      .then(data=>{
        return data.data.result.filter(checklist=> checklist["group"]== "Pool Test Results")
      })
        .then(poolTest=>{
          this.setState({
            currentChecklist:poolTest[0].id
          })
          return poolTest[0]
        })
        .then((poolTestChecklist)=>{
            this.getPoolTestResultsChecklistItems(poolTestChecklist.id)
        })
      .catch((error)=>{
        console.log(`Error getting checklists for ${inspId}`)
      })
  }

  getPoolTestResultsChecklistItems(checklistId){
    axios.get(`https://apis.accela.com/v4/inspections/${this.state.currentInspection}/checklists/${checklistId}/checklistItems`,this.state.header)
    .then((data)=>{
      return data.data.result.filter(item=> item.checklist == "Pool Test Results")
    })
    .then((poolTestResultItem)=>{
      this.getPoolTestTable(poolTestResultItem[0].id)
    })
    .catch((error)=>{
      console.log(`Error getting checklist item for ${checklistId}`)
    })
  }

getPoolTestTable(itemId){
    this.setState({
      currentItemId: itemId
    })
     axios.get(`https://apis.accela.com/v4/inspections/${this.state.currentInspection}/checklists/${this.state.currentChecklist}/checklistItems/${itemId}/customTables`, this.state.header)
     .then(function(data){
       return data.data.result.filter(table=> table.id=="POOL_LIC-OUTSIDE.cLAB.cPOOL.cSAMPLES")
     }.bind(this))
     .then(function(poolTable){
       var rows= poolTable[0].rows== undefined ? [] : poolTable[0].rows
       this.setState({
         currentTable:Object.assign([], rows)
       })
     }.bind(this))
     .catch((error)=>{
       console.log(`Error getting custom tables for ${itemId}`)
     })
}





submitResults(rows){

  var rows= rows;
  var url=`https://apis.accela.com/v4/inspections/${this.state.currentChecklist}/checklists/${this.state.currentChecklist}/checklistItems/${this.state.currentItemId}/customTables`
   var promises=[]
  rows.forEach((row)=>{
    if("fields" in row && row.fields["save"]){
      promises.push(
        new Promise (function (resolve, reject){
          console.log(`inspection: ${this.state.currentInspection}, checklist: ${this.state.currentChecklist}`);
          let fields={
             "Coliform Results":row.fields["Coliform Results"],
             "E. Coli Results":row.fields["E. Coli Results"],
             "Collection Date":row.fields["Collection Date"],
             "HPC":row.fields["HPC"],
             "Name":row.fields["Name"],
             "Notes":row.fields["Notes"],
             "Sample ID":row.fields["Sample ID"],
             "Valid Results":row.fields["Valid Results"]
           }
           axios.put(url, JSON.stringify([
                  {
                  "id": "POOL_LIC-OUTSIDE.cLAB.cPOOL.cSAMPLES",
                  "rows": [
                  {
                  "action": "add",
                  "fields": fields
                  }
                  ]
                  }
                ]), this.state.header)
                .then(function (data){
                   resolve(data)
                 }.bind(this))
                 .catch(error=>{
                   console.log(`error`)
                 })
        }.bind(this))
      )
    }

  })

  Promise.all(promises).then(function(data){
      this.handleResponse(data)
    }.bind(this))


}

handleResponse(data){
  data.forEach(resp=>{
    if(data.status!= 200){
      this.setState({response:data.status})
    }else{
      this.setState({response:200})
    }
  })
}


  render() {
    return (
      <div className="App">
       <Login handleSubmit={this.handleSubmit} user={this.state.user} />
      {this.state.loadPools ?
        <div className="licenses">
          <Licenses caps={this.state.myCaps} getCapInspections={this.getPoolInspections}/>
        </div> : null}
        <div className="inspections">
          {this.state.currentLicense ? <Inspections inspList={this.state.myInspections} currentRecord={this.state.currentLicense} getPoolTestResults={this.getPoolTestResults}/> : null}
        </div>
          <div className="rows">
          {this.state.currentInspection ? <Pools poolsList= {this.state.currentTable} currentInspection={this.state.currentInspection}
          handleSubmit={this.submitResults} reponseStatus={this.state.response}
          />
          : null}
          </div>
      </div>
    )
  }
}

export default App;
