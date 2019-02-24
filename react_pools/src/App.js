import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import $ from "jquery";


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
      currentLicense:'',
      loginFailed:false,
      user:'',
      loadPools:false,
      currentInspection:'',
      currentChecklist:'',
      currentItemId: '',
      showButtons:'',
      header:{}
    }
    this.handleSubmit=this.handleSubmit.bind(this)
    this.getPoolInspections=this.getPoolInspections.bind(this)
    this.getPoolTestResults=this.getPoolTestResults.bind(this)
    this.getPoolTestResultsChecklistItems= this.getPoolTestResultsChecklistItems.bind(this)
    this.getMyCaps=this.getMyCaps.bind(this)
  }





  handleSubmit(username, password){
    var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://apis.accela.com/oauth2/token",
    "method": "POST",
    "headers": {
      "accept": "application/json",
      "content-type": "application/x-www-form-urlencoded",
      "cache-control": "no-cache",
      "postman-token": "cf1bf090-530b-ed7d-4b77-5e1dbb8b6ae7"
    },
    "data": {
      "username": username,
      "grant_type": "password",
      "environment": "SUPP",
      "agency_name": "MCPHD",
      "client_id": "636767970437851872",
      "client_secret": "606531ea10c7492da9c22e79ddd7c2ea",
      "scope": "records inspections",
      "password": password,
      "id_provider": "citizen"
    }
  }

  $.ajax(settings).done( function(response){

    this.setState({
      header:Object.assign({}, {"headers":{"authorization":response.access_token, "cache-control": "no-cache",
        "postman-token": "59acabbe-f19d-c8a1-f10d-dd1b1918b660"}}),
      user:username
    })
  }.bind(this))
  .then(function(data){
    this.getMyCaps()
  }.bind(this))
  .fail(function(error) {
    this.setState({
      loginFailed:true
    })
  }.bind(this))
  }

  getMyCaps() {
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
      myInspections:Object.assign([], [])
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
      currentChecklist:'',
      currentItemId:'',
      showButtons: false,
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
      this.setState({
        currentItemId: poolTestResultItem[0].id
      })
    })
    .catch((error)=>{
      console.log(`Error getting checklist item for ${checklistId}`)
    })
  }



  render() {
    return (
      <div className="App">
       <Login handleSubmit={this.handleSubmit} user={this.state.user} failed={this.state.loginFailed} />
      {this.state.loadPools ?
        <div className="licenses">
          <Licenses caps={this.state.myCaps} getCapInspections={this.getPoolInspections}/>
        </div> : null}
        <div className="inspections">
          {this.state.currentLicense ? <Inspections inspList={this.state.myInspections} currentRecord={this.state.currentLicense} getPoolTestResults={this.getPoolTestResults}/> : null}
        </div>
          <div className="rows">
          {this.state.currentInspection ?
            <Pools
            currentRecord={this.state.currentLicense}
            currentInspection={this.state.currentInspection}
            currentChecklist={this.state.currentChecklist}
            currentItemId={this.state.currentItemId}
            showButtons={this.state.showButtons}
            header={this.state.header}
          />
          : null}
          </div>
      </div>
    )
  }
}

export default App;
