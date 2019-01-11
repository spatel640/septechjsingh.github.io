import React, {Component} from 'react'
import Pool from './Pool.js'
import Cap from './Cap.js'
import axios from 'axios'

export default class Pools extends Component{
  constructor(props){
    super(props)
    this.state={
      loading:true,
      pools:this.props.pools_list
    }
    this.handleSubmit=this.handleSubmit.bind(this)
    this.manageInput=this.manageInput.bind(this)
    this.handleCapClick=this.handleCapClick.bind(this)
  }

  handleSubmit(e){
    e.preventDefault()
    const config = { "headers":{
      "authorization": "cSM_FZcJy4gvO1imyhVQyNYntLYn2OT3ohdSZpVGoSvLF-LAqHZD9Ed3He_7fqomA0bdhhKUcdNbX_PcIPyZA0MWcHrT-Lq_RpEAvjRCfI7tBaSHAlnOgmSbu3Wbsx41F9oimrQLaRjBNBhalWSyRZhB-mSX2Z5RUgOuSVMkShaHzfG3Zfqtlg-_ni6dJkKJ1CA8FeVm1bFzaWPCWfTwklgZxFBYEeorB58vf97ue3R0-ypHAQHW_W2tl0jz-rKwE9YeENQPplV4f2BwIFaNJIwT12lwD-ICqhFzO2ilBxtlIsNmUWo1d4koeuPO-OIRtnrNVSu6PtP9MtCeQXIYOYq46dxPbgudgElvjS6a8ObezHwPW6ENrzH9zL_ybUpU8KB8bSQcepoH8iHo859KqsmmBk1c-s8LrtwRQu8ey16peGiZHns_Fl3o3sP8Uqo491vrVCZjQhcnOJXiRwmtC3jxwDEj7RCDVA3aFEj9Vi6lGgQl3UnwUvfYQOFqopem0",
      "accept": "application/json",
      "content-type": "application/json",
      "cache-control": "no-cache",
      "crossDomain": true,
 }};
   var url=`https://apis.accela.com/v4/inspections/${inspId}/checklists/${checklistId}/checklistItems/${checklistItemId}/customTables`
    var inspId;
    var checklistId;
    var checklistItemId;
    var promises;

    this.state.pools.forEach((pool)=>{
      if(pool.submit){
      promises.push(
        new Promise(function(resolve, reject){
          console.log(`inspection: ${pool.inspection}, checklist: ${pool.checklistId}`)
           inspId=pool.inspection
           checklistId=pool.checklistId
           checklistItemId=pool.itemId
           let fields={
             "Coliform Results":pool["Coliform Results"],
             "E. Coli Results":pool["E. Coli Results"],
             "Collection Date":pool["Collection Date"],
             "HPC":pool["HPC"],
             "Name":pool["Name"],
             "Notes":pool["Notes"],
             "Sample ID":pool["Sample ID"],
             "Valid Results":pool["Valid Results"]
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
                  ]), config)
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

  manageInput(index, name, value){
    var updatedPools=this.state.pools
    var updated=Object.assign({}, this.state.pools[index],{[name]: value})
    updatedPools[index]= updated
      this.setState({
        pools:[
        ...this.state.pools.slice(0,index),
        {
            ...this.state.pools[index],
            [name]: value,
        },
        ...this.state.pools.slice(index+1)
    ]
      })
  }

  handleCapClick(capNumber){
    this.props.getCapInspections(capNumber)
  }



  render(){
    return(
      <div>
        {this.props.caps.map((cap,index)=>{

        return<Cap
        recordId={cap["customId"]}
        capId={cap["id"]}
        onCapClick={this.handleCapClick}
        />})
      }
      </div>


    )
  }


}
