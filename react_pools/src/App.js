import React, { Component } from 'react';
import './App.css';
import axios from 'axios'


//mycomponents
import Login from './components/Login'
import Pools from './components/Pools'
import Inspections from './components/Inspections.js'

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
      loadPools:false
    }
    this.handleSubmit= this.handleSubmit.bind(this)
    this.getPoolInspections=this.getPoolInspections.bind(this)
  }





  handleSubmit(username, password){
    var header={
      "headers": {
      "authorization": "cSM_FZcJy4gvO1imyhVQyNYntLYn2OT3ohdSZpVGoSvLF-LAqHZD9Ed3He_7fqomA0bdhhKUcdNbX_PcIPyZA0MWcHrT-Lq_RpEAvjRCfI7tBaSHAlnOgmSbu3Wbsx41F9oimrQLaRjBNBhalWSyRZhB-mSX2Z5RUgOuSVMkShaHzfG3Zfqtlg-_ni6dJkKJ1CA8FeVm1bFzaWPCWfTwklgZxFBYEeorB58vf97ue3R0-ypHAQHW_W2tl0jz-rKwE9YeENQPplV4f2BwIFaNJIwT12lwD-ICqhFzO2ilBxtlIsNmUWo1d4koeuPO-OIRtnrNVSu6PtP9MtCeQXIYOYq46dxPbgudgElvjS6a8ObezHwPW6ENrzH9zL_ybUpU8KB8bSQcepoH8iHo859KqsmmBk1c-s8LrtwRQu8ey16peGiZHns_Fl3o3sP8Uqo491vrVCZjQhcnOJXiRwmtC3jxwDEj7RCDVA3aFEj9Vi6lGgQl3UnwUvfYQOFqopem0",
      "cache-control": "no-cache",
      "postman-token": "59acabbe-f19d-c8a1-f10d-dd1b1918b660"
    }}
    this.setState({
      user:'lwacht@septechconsulting.com'
    })
    axios.get("https://apis.accela.com/v4/records/mine", header)
    .then(function(data){
      debugger
      return data.data.result.forEach(function(cap){
        if (cap.type.type=="WQ" && cap.type.category=="License" && (cap.status.value != "Closed – Permanent" && cap.status.value !="Closed – Self Closure")){
          this.setState({
            myCaps:[...this.state.myCaps, cap]
          })
        }
      }.bind(this))
    }.bind(this))
    .then(function(){
      debugger
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
      currentLicense:capNumber
    })
    var header={
      "headers": {
      "authorization": "cSM_FZcJy4gvO1imyhVQyNYntLYn2OT3ohdSZpVGoSvLF-LAqHZD9Ed3He_7fqomA0bdhhKUcdNbX_PcIPyZA0MWcHrT-Lq_RpEAvjRCfI7tBaSHAlnOgmSbu3Wbsx41F9oimrQLaRjBNBhalWSyRZhB-mSX2Z5RUgOuSVMkShaHzfG3Zfqtlg-_ni6dJkKJ1CA8FeVm1bFzaWPCWfTwklgZxFBYEeorB58vf97ue3R0-ypHAQHW_W2tl0jz-rKwE9YeENQPplV4f2BwIFaNJIwT12lwD-ICqhFzO2ilBxtlIsNmUWo1d4koeuPO-OIRtnrNVSu6PtP9MtCeQXIYOYq46dxPbgudgElvjS6a8ObezHwPW6ENrzH9zL_ybUpU8KB8bSQcepoH8iHo859KqsmmBk1c-s8LrtwRQu8ey16peGiZHns_Fl3o3sP8Uqo491vrVCZjQhcnOJXiRwmtC3jxwDEj7RCDVA3aFEj9Vi6lGgQl3UnwUvfYQOFqopem0",
      "cache-control": "no-cache",
      "postman-token": "59acabbe-f19d-c8a1-f10d-dd1b1918b660"
    }}
    axios.get(`https://apis.accela.com/v4/records/${capNumber}/inspections`, header)
    .then(function(data){
      this.setState({
        myInspections:data
      })
      debugger
    }.bind(this))
    .catch((error)=>{
      console.log(`Error getting inspections for ${capNumber}`)
    })
  }




  render() {
    return (
      <div className="App">
       <Login handleSubmit={this.handleSubmit} user={this.state.user} />
      {this.state.loadPools ?
        <div>
          <Pools caps={this.state.myCaps} getCapInspections={this.getPoolInspections}/>
        </div> : null}
      {this.state.currentLicense ? <Inspections inspList={this.state.myInspections} currentRecord={this.state.currentLicense}/> : null}
      </div>
    )
  }
}

export default App;
