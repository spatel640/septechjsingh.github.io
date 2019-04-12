import React, { Component } from 'react';
import './index.css';
import './App.css';



//mycomponents
import Login from './components/Login'
import Licenses from './components/Licenses'
import Pools from './components/Pools.js'
import Status from './components/Status.js'
import Header from './components/Header.js'
import Message from './components/Message.js'
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
      gotCaps:false,
      poolStatus:"Open",
      header:{},
      status:'',
      latestInspection:'',
      latestChecklist:'',
      poolStatusResponse:'',
      showError:false,
      errorText:''
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
    this.handleErrors=this.handleErrors.bind(this)
    this.logOut=this.logOut.bind(this)
  }


componentWillMount(){
  var token= sessionStorage.getItem('authorization');
  var user=sessionStorage.getItem('user')
  if(token){
  this.setState({
    header: Object.assign({}, {"headers":{"authorization":token, "cache-control": "no-cache",
      "postman-token": "59acabbe-f19d-c8a1-f10d-dd1b1918b660"}}),
      user:user
  })
  }
}

componentDidMount(){
  if(this.state.header){
    this.getMyCaps()
  }
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
    sessionStorage.setItem('authorization', response.access_token);
    sessionStorage.setItem('user', username)
    this.setState({
      header:Object.assign({}, {"headers":{"authorization":response.access_token, "cache-control": "no-cache",
        "postman-token": "59acabbe-f19d-c8a1-f10d-dd1b1918b660"}}),
      user:username,
      loginFailed:false
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
    .catch(function(error){
      console.log(error.message)
      this.handleErrors(error)
    }.bind(this))
  }



  getIdentifiers(){
    let promises=this.state.myCaps.map(function(cap) {
      return new Promise(function(resolve, reject){
            axios.get( `https://apis.accela.com/v4/records/${cap.id}/customForms`, this.state.header)
            .then(function(data){
            resolve(data.data.result)
          }.bind(this))
            .catch(function(error){
              console.log(error.message)
              this.handleErrors(error)
            }.bind(this))
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
    .catch(function(error){
      console.log(`Error getting inspections for ${capNumber}`)
      console.log(error.message)
      this.handleErrors(error)
    }.bind(this))
    }
  }


  getPoolTestResults(inspId, inspStatus){
    var scheduled= inspStatus === "Scheduled" ? true : false;
    this.setState({
      currentInspection:inspId,
      isScheduled:scheduled,
      currentChecklist:'',
      currentItemId:'',
      showError:false
    });
    axios.get(`https://apis.accela.com/v4/inspections/${inspId}/checklists`,this.state.header)
      .then(data=>{
        return data.data.result.filter(checklist=> checklist["group"]=== "Pool Test Results")
      })
        .then(poolTest=>{
          this.setState({
            currentChecklist:poolTest[0].id
          });
          return poolTest[0];
        })
        .then((poolTestChecklist)=>{
            this.getPoolTestResultsChecklistItems(poolTestChecklist.id);
        })
      .catch(function(error){
        this.handleErrors(error);
      }.bind(this))
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
    .catch(function(error){
      console.log(`Error getting checklist item for ${checklistId}`)
      console.log(error.message)
      this.handleErrors(error)
    }.bind(this))
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
   .catch(function(error){
     console.log(error.message)
     this.handleErrors(error)
     console.log("Error getting checklist for latest inspection")
   }.bind(this))
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
                 .catch(function(error){
                   console.log(error.message)
                   this.handleErrors(error)
                 }.bind(this))
}

handleErrors(error){
  var eCode= error.response.data.code.toLowerCase();
  var errorText='';
  if(eCode.includes("expired") || eCode.includes("invalid_token")){
    alert("Session expired. Please log back in. Redirecting to login page")
    this.logOut()
  }else {
    if(eCode.includes("unauthorized") || eCode.includes("forbidden")){
      errorText='User not authorized to access requested resource'
    }else if(eCode.includes("not_found")){
      errorText="Something went wrong with the request, please try again later"
    }
    else if(eCode.includes("server_error") || eCode.includes("connection")){
      errorText="There was a problem with the server, please try again later"
    }
    this.setState({
      error:errorText,
      showError:errorText ? true : false
    })
  }
}

  startTimer(){
    setTimeout(()=>{
      this.logOut()
    }, 72000000)
  }

  logOut(){
    sessionStorage.clear();
    this.setState({
      header:{},
      user:'',
      myCaps:[],
      currentLicense:'',
      currentInspection:'',
      currentChecklist:null,
      myInspections:Object.assign([], []),
      latestInspection:'',
      gotCaps:false,
      showError:false
    })

  }



  render() {
    var licenseHolder=null;
    if(this.state.currentLicense && this.state.gotCaps){
      licenseHolder=<Header text={ this.state.myCaps.find(cap=>cap.id == this.state.currentLicense)}/>
    }else if(this.state.gotCaps && !this.state.currentLicense){
      licenseHolder=<Message message={'Please select a Pool from the "Authorized Pools" list on the left to access submission weeks for a specific pool'} class={"instructions"}/>
    }
    var error=this.state.showError ? <Message message={this.state.errorText} class={"error"}/> : null;

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
         {licenseHolder}
          {this.state.latestInspection && this.state.currentLicense ?
            <Status status={this.state.status ? this.state.status : "Open"} latestInspection={this.state.latestInspection} updatePoolStatus={this.updatePoolStatus} updateStatus={this.state.poolStatusResponse}/> : null}
            {error}
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
