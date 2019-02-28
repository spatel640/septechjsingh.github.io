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
      isScheduled:false,
      currentChecklist:'',
      currentItemId: '',
      showButtons:'',
      poolStatus:"Open",
      header:{}
    }
    this.handleSubmit=this.handleSubmit.bind(this)
    this.getPoolInspections=this.getPoolInspections.bind(this)
    this.getPoolTestResults=this.getPoolTestResults.bind(this)
    this.getPoolTestResultsChecklistItems= this.getPoolTestResultsChecklistItems.bind(this)
    this.getMyCaps=this.getMyCaps.bind(this)
    this.getPoolStatus= this.getPoolStatus.bind(this)
    this.handleInput=this.handleInput.bind(this)
    this.updatePoolStatus=this.updatePoolStatus.bind(this)
    this.logOut=this.logOut.bind(this)

  }

  componentDidMount() {
    var value;
    var username
   if (localStorage.getItem("authorization") && localStorage.getItem("user")){
       value = localStorage.getItem("authorization");
      username=localStorage.getItem("user");
       this.setState({
         header:Object.assign({}, {"headers":{"authorization":value, "cache-control": "no-cache",
           "postman-token": "59acabbe-f19d-c8a1-f10d-dd1b1918b660"}}),
         user:username
       })

   }
   this.getMyCaps(value)
}



handleInput(e){
  var name=e.target.name
  var value=e.target.value
  this.setState({
    [name]: value
  })
}

updatePoolStatus(e){
  e.preventDefault()
    var url=`https://apis.accela.com/v4/records/${this.state.currentLicense}/customForms`
             axios.put(url, JSON.stringify([
                    {
                    "id": "POOL_LIC-SITE.cINFORMATION",
                    "<aCustomFieldName>":"Pool Status",
                    "<aCustomFieldValue>": this.state.poolStatus
                    }
                  ]), this.state.header)
                  .then(function (data){
                     debugger
                   }.bind(this))
                   .catch(error=>{
                     console.log(`error`)
                   })
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
    localStorage.setItem("authorization",response.access_token );
    localStorage.setItem("user", username);
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

  getMyCaps(token) {
    axios.get("https://apis.accela.com/v4/records/mine", {"headers":{"authorization":token, "cache-control": "no-cache",
      "postman-token": "59acabbe-f19d-c8a1-f10d-dd1b1918b660"}})
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
    .then(function(data){
      this.getPoolStatus()
    }.bind(this))
    .catch((error)=>{
      console.log(`Error getting inspections for ${capNumber}`)
    })
  }


  getPoolTestResults(inspId, inspStatus){
    var scheduled= inspStatus == "Scheduled" ? true : false
    this.setState({
      currentInspection:inspId,
      isScheduled:scheduled,
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

  getPoolStatus(){
    var recordId=this.state.currentLicense;
    axios.get(`https://apis.accela.com/v4/records/${recordId}/customForms`,this.state.header)
    .then(function(data){

      var poolStatus=data.data.result[0]["Pool Status"] ? data.data.result[0]["Pool Status"] : "Open"
      this.setState({
        poolStatus:poolStatus
      })
    }.bind(this))
  }

  logOut(){
    localStorage.removeItem("authorization")
    localStorage.removeItem("user")
    this.setState({
      header:Object.assign({}, {"headers":{"authorization":'', "cache-control": "no-cache",
        "postman-token": "59acabbe-f19d-c8a1-f10d-dd1b1918b660"}}),
      user:''
    })

  }



  render() {
    return (
      <div className="App">
       <Login handleSubmit={this.handleSubmit} user={this.state.user} failed={this.state.loginFailed} />
      {this.state.loadPools ?
        <div className="licenses">
          <Licenses caps={this.state.myCaps}
          getCapInspections={this.getPoolInspections}
          current={this.state.currentLicense}
          currentInspection={this.state.currentInspection}
          poolInspections={this.state.myInspections}
          inspList={this.state.myInspections}
          getPoolTestResults={this.getPoolTestResults}/>
        </div> : null}
        <div id="main">
        {this.state.currentLicense ?
        <form id="pool-status-container" onSubmit={this.updatePoolStatus}>
        <label>Pool Status</label>
        <select value={this.state.poolStatus} name="poolStatus" required onChange={this.handleInput}>
          <option name="Open">Open</option>
          <option name="Closed">Closed</option>
        </select>
        <input type="submit" value="UPDATE POOL STATUS" />
        </form> : null}
          <div className="rows">
          {this.state.currentInspection ?
            <Pools
            currentRecord={this.state.currentLicense}
            currentInspection={this.state.currentInspection}
            currentChecklist={this.state.currentChecklist}
            currentItemId={this.state.currentItemId}
            poolStatus={this.state.poolStatus}
            header={this.state.header}
            isScheduled={this.state.isScheduled}
            currentUser={this.state.user}
          />
          : null}
          </div>
          </div>
          {this.state.user ? <button id="logout" onClick={this.logOut}>LOGOUT </button>: null}
      </div>
    )
  }
}

export default App;
