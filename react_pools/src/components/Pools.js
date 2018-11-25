import React, {Component} from 'react'
import Pool from './Pool.js'
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
  }

  handleSubmit(e){
    e.preventDefault()
    const config = { "headers":{
      "authorization": "NdCld7jo5njgLdFJLX77VpXvPTVEPd9qoxMOiqJMe3o61FY9UpZTFHrz2jrhLDIxwo_DKuy70iHit_dFzov9NYHsRrVSGNBFdCf8xZolGY5ZQJMYD7sboJf8t8YxPJQjJHATeCSALGfgRsi1ep1zRcwHpojz1T43tXZECeWNC2sqB0QntomiR2I22WfSOKTCwmMfRPHwkZMQrbK5Xmv5nwjnrMtocD3uEc0rZhUxYXZB4pBlJ4uc1gmKl8B39Q8ZU8ifGfLbe0lRUTUN6dKprIVTs7STxwAkGx-AGcUPSrT4BHr76UvckecoMaiOwC8-XVyxemhELJC_a964yIZYyRLZo6DR7lBMK1BdoGoifMGKl458WEdciAy46eT62rrl_JoPB5SamwFaU0qQJZ2p1VttixJWxNe4p_05xmp3bK-m4xYWH7N2vzjMtjcmZilN27fctYuKmYna6e2NU0Vujg2",
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
debugger
  }



  render(){
    return(
      <div>
      <table>
      <thead>
      <tr>
        <th>Coliform Results</th>
        <th>Collection Date</th>
        <th>Valid Results</th>
        <th>Sample ID</th>
        <th>E. Coli Results</th>
        <th>HPC</th>
        <th>Comments</th>
        <th>User</th>
        <th>Submit Results</th>
      </tr>
      </thead>
      <tbody>
        {this.state.pools.map((pool,index)=>{

        return<Pool
        inspection={pool["inspection"]}
        coliformsResults={pool["Coliform Results"]}
        collection_date={pool["Collection Date"]}
        results={pool["Valid Results"]}
        sampleID={pool["Sample ID"]}
        eColiResults={pool["E. Coli Results"]}
        hpc={pool["HPC"]}
        comments={pool["Notes"] }
        name={pool["Name"]}
        key={index}
        itemId={index}
        submitInsp={pool["submit"]}
        submitted={pool["Valid Results"] ? true : false }
        manageInput={this.manageInput}
        updated={pool["Updated"]} /> })
      }
      </tbody>
      </table>
      <input type="submit" value="submit" onClick={this.handleSubmit} />
      </div>


    )
  }


}
