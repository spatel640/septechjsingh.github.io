import React, { Component } from 'react';
import './index.css';
import './App.css';



//mycomponents
import Login from './components/Login'
import Licenses from './components/Licenses'
import Inspections from './components/Inspections.js'
import Pools from './components/Pools.js'
import Status from './components/Status.js'
import Header from './components/Header.js'
import axios from 'axios';
import $ from "jquery";

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      myCaps:[],
      myInspections:[],
      currentLicense:'',
      loginFailed:false,
      user:'',
      currentInspection:'',
      isScheduled:false,
      currentChecklist:'',
      currentItemId: '',
      showButtons:'',
      gotCaps:false,
      poolStatus:"Open",
      header:{},
      status:'',
      latestInspection:'',
      latestChecklist:'',
      poolStatusResponse:'',
    }
    this.handleSubmit=this.handleSubmit.bind(this)
    this.getPoolInspections=this.getPoolInspections.bind(this)
    this.getPoolTestResults=this.getPoolTestResults.bind(this)
    this.getPoolTestResultsChecklistItems= this.getPoolTestResultsChecklistItems.bind(this)
    this.getMyCaps=this.getMyCaps.bind(this)
    this.getIdentifiers=this.getIdentifiers.bind(this)
    this.getChecklist=this.getChecklist.bind(this)
    this.startTimer= this.startTimer.bind(this)
    this.updatePoolStatus=this.updatePoolStatus.bind(this)
    this.getPoolStatus=this.getPoolStatus.bind(this)
    this.logOut=this.logOut.bind(this)
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
    this.startTimer()
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
      this.getIdentifiers()
    }.bind(this))

    .catch((error)=>{
      console.log("error getting my caps")
    })
  }



  getIdentifiers(){
    let promises=this.state.myCaps.map(function(cap) {
      return new Promise(function(resolve, reject){
            axios.get( `https://apis.accela.com/v4/records/${cap.id}/customForms`, this.state.header)
            .then(function(data){
            resolve(data.data.result)
          }.bind(this))
            .catch(error =>{
            console.log("error getting inspections for cap")
            })
          }.bind(this))
        }.bind(this))

    Promise.all(promises)
    .then(function(data){
       data.forEach(function(cap, index){

         var facilityInfo=cap.find((asi)=> asi.id == "POOL_LIC-FACILITY.cINFORMATION");
         facilityInfo = (facilityInfo && facilityInfo["Facility Name"]) ? facilityInfo["Facility Name"] : '';
         var siteInfo=cap.find((asi)=> asi.id == "POOL_LIC-SITE.cINFORMATION");
         siteInfo= (siteInfo && siteInfo["Pool Type"]) ? siteInfo["Pool Type"]: '';
         var id=facilityInfo + "- " + siteInfo
         this.setState({
           myCaps: [
             ... this.state.myCaps.slice(0, index),
             Object.assign({}, this.state.myCaps[index], {identifier: id}),
             ...this.state.myCaps.slice(index+1)
           ]
         })
      }.bind(this))
    }.bind(this))
  .then(function(){
      this.setState({
        gotCaps:true
      })
    }.bind(this))
  }


  getPoolInspections(capNumber){
    var newCap='';
    if(capNumber !== this.state.currentLicense){
      newCap=capNumber
    }
    this.setState({
      currentLicense:newCap,
      currentChecklist:null,
      myInspections:Object.assign([], []),
      currentInspection:'',
      latestInspection:'',
      latestChecklist:'',
      status:'',
      poolStatusResponse:''
    })
    if(capNumber){
    axios.get(`https://apis.accela.com/v4/records/${capNumber}/inspections`, this.state.header)
    .then((data)=>{
        return data.data.result.sort(function(a,b){
        var dateA = new Date(a.scheduleDate).getTime();
        var dateB = new Date(b.scheduleDate).getTime();
        return dateB > dateA ? 1 : -1;
        })
    })
    .then(function(data){
      if(data){
      this.setState({
        myInspections:data
      })
    }
    this.getChecklist(data[0].id)
    }.bind(this))
    .catch((error)=>{
      console.log(`Error getting inspections for ${capNumber}`)
    })
    }
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

  getPoolStatus(inspId, checklist, item){

     axios.get(`https://apis.accela.com/v4/inspections/${inspId}/checklists/${checklist}/checklistItems/81636/customTables`, this.state.header)
     .then(function(data){

       return data.data.result.filter(table=> table.id=="POOL_LIC-POOL.cSTATUS")
     }.bind(this))
     .then(function(data){
       let status= data[0].rows ? data[0].rows[0].fields["Pool Status"]:'';
       let action= data[0].rows ? 'update' : 'add'
       this.setState({
         status:status,
         latestInspection:inspId,
         latestChecklist:checklist,
         statusAction: action
       })
     }.bind(this))
}

getChecklist(inspId){
   axios.get(`https://apis.accela.com/v4/inspections/${inspId}/checklists/`, this.state.header)
   .then(function(data){
       return data.data.result.find(checklist=> checklist["group"]== "Pool Test Results")
   }.bind(this))
   .then(function(data){
     if(data){
       this.getPoolStatus(data.inspectionId, data.id)
     }
   }.bind(this))
   .catch(error=>{
     console.log("Error getting checklist for latest inspection")
   })
}

updatePoolStatus(){
  var status=this.state.status == 'Closed' ? "Open" : "Closed"
  var rows=this.state.statusAction=="update" ? [{
    "action": this.state.statusAction,
    "fields": {"Pool Status": status},
    "id": 1
  }] : [{"action": this.state.statusAction,
  "fields": {"Pool Status": status}}]
  var url=`https://apis.accela.com/v4/inspections/${this.state.latestInspection}/checklists/${this.state.latestChecklist}/checklistItems/81636/customTables`
           axios.put(url, JSON.stringify([
                  {
                  "id": "POOL_LIC-POOL.cSTATUS",
                  "rows": rows
                  }
                ]), this.state.header)
                .then(function (data){
                  var newStatus= data.status == 200 ? status : this.state.status
                  this.setState({
                    status: newStatus,
                    poolStatusResponse: data.status
                  })
                 }.bind(this))
                 .catch(error=>{
                   console.log(`error`)
                 })
}


  startTimer(){
    setTimeout(()=>{
      this.logOut()
    }, 72000000)
  }

  logOut(){
    localStorage.clear();
    this.setState({
      header:Object.assign({}, {"headers":{"authorization":'', "cache-control": "no-cache",
        "postman-token": "59acabbe-f19d-c8a1-f10d-dd1b1918b660"}}),
      user:'',
      myCaps:[],
      currentLicense:'',
      currentInspection:'',
      currentChecklist:null,
      myInspections:Object.assign([], []),
      latestInspection:'',
      gotCaps:false
    })

  }



  render() {
    return (
      <div className="App">
      {this.state.gotCaps ?
      <div className="left-nav">
       <Login handleSubmit={this.handleSubmit} user={this.state.user} failed={this.state.loginFailed} logOut={this.logOut}/>

          <Licenses caps={this.state.myCaps}
          getCapInspections={this.getPoolInspections}
          current={this.state.currentLicense}
          currentInspection={this.state.currentInspection}
          poolInspections={this.state.myInspections}
          inspList={this.state.myInspections}
          header={this.state.header}
          getPoolTestResults={this.getPoolTestResults}/>
          <button id="logout" onClick={this.logOut} >LOGOUT </button>
         </div>: <Login handleSubmit={this.handleSubmit} user={this.state.user} failed={this.state.loginFailed}/>}
         {this.state.currentLicense ?
           <Header text={ this.state.myCaps.find(cap=>cap.id == this.state.currentLicense)}/> : null
         }
          {this.state.latestInspection && this.state.currentLicense ?
            <Status status={this.state.status ? this.state.status : "Open"} latestInspection={this.state.latestInspection} updatePoolStatus={this.updatePoolStatus} updateStatus={this.state.poolStatusResponse}/> : null}

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
    )
  }
}

export default App;
