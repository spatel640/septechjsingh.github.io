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
      myChecklists:[],
      token:'',
      user:'',
      currentLicense:'',
      failed:false,
      loadPools:false,
      currentInspection:'',
      currentChecklist:'',
      currentTable:[],
      header:{
        "headers": {
        "authorization": "QEPKyf9HKnAMCjtdzYXqx0A_GFouF31cSkVIuXhhW2GQyxhGnnJdlLHkd9y0u8_qxXpT7jGjNiFsHwroeJ9WfOLu6P4rNSiDTovupdpyB1EA7W6xWgnNoaM0vNv0OzS1hRQfEwfdS1Tz9lBUxEEfzYSB2ieQblQkzGmWgtMa9h8VoOgyU_7WMe-huhKqk8IG4gVMKFhavDSOHGa2ELrnJ9FUAuTEVmclW8SDMyAP4kJUUGqFnE4NY8uZuW8JSD8TqVlIhOFrRYUZ3MFze9ZO_EKrYevGmrdTek5YhuGCYkzLp8A4NOnF-q0AlyD6wQS78IgFXPirZUtTSoBbDmoudO-rX1yc7C_YFzqA3pdHBnGqxR1NHdYISz_eS3ewDEDXvY61alxcUa5XPYXoI2pe7PvyWv_uqk5AUpi2e5HimhZIjuwUMkFGuI2MsF6xmM2DOsyLp8xzvx5mEpkqSTsMog2",
        "cache-control": "no-cache",
        "postman-token": "59acabbe-f19d-c8a1-f10d-dd1b1918b660"
      }}
    }
    this.handleSubmit= this.handleSubmit.bind(this)
    this.getPoolInspections=this.getPoolInspections.bind(this)
    this.getPoolTestResults=this.getPoolTestResults.bind(this)
    this.getPoolTestResultsChecklistItems= this.getPoolTestResultsChecklistItems.bind(this)
    this.addPoolRow=this.addPoolRow.bind(this)
    this.updateTable=this.updateTable.bind(this)
    this.submitResults=this.submitResults.bind(this)
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
      currentTable:Object.assign([], [])
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
    axios.get(`https://apis.accela.com/v4/inspections/${inspId}/checklists`,this.state.header)
      .then(data=>{
        return data.data.result.filter(checklist=> checklist["group"]== "Pool Test Results")
      })
        .then(poolTest=>{
          this.setState({
            currentInspection:inspId,
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

addPoolRow(){
  this.setState({
    currentTable:[...this.state.currentTable, { id:this.state.currentTable.length+1,
      fields:{
      "Collection Date":"",
      "Sample ID":"",
      "Valid Results":"",
      "E. Coli Results":"",
      "Coliform Results":"",
      "HPC":"",
      "Notes":"",
      "Name":""},

    }]
  })

}

updateTable(index, rowInfo, id){
var updatedPools=this.state.currentTable
this.setState({
  currentTable:[...this.state.currentTable.slice(0,index),
  Object.assign({}, {id: id, fields:rowInfo}),
  ...this.state.currentTable.slice(index+1)]
})
}

submitResults(){
  var rows= this.state.currentTable;
  var url=`https://apis.accela.com/v4/inspections/${inspId}/checklists/${checklistId}/checklistItems/${checklistItemId}/customTables`
   var inspId;
   var checklistId;
   var checklistItemId;
   var promises=[]
  rows.forEach((row)=>{
    if(row.fields["SubmitResults"]){
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
                .then(data=>{
                   resolve(data.result)
                 })
                 .catch(error=>{
                   console.log(`error`)
                 })
        }.bind(this))
      )
    }

  })
  Promise.all(promises).then((data)=>{
       debugger;
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
          addRow={this.addPoolRow}
          updateTable={this.updateTable}
          handleSubmit={this.submitResults}
          />
          : null}
          </div>
      </div>
    )
  }
}

export default App;
