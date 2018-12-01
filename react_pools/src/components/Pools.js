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
      "authorization": "2GAV4UM-m2Zk7Of8IStbAU_t1-6uE9bmBw6hZxelnYLmlNSZ7HWtF99jZAAhncjjJXh121ztfCgnYJRuGHJHzlTKokN8yQjGwZ_OYmLdeWP637MFQF7p7xYZE0kPeNpCSwpoTJvaBYIXpShhCEHLKWff1h-6uAMk7Q4rOBXbLQgW4jPjAXkNJI9RUK0DvcLl0qrgrFyd759tf4BcDpJJ6hBAMYx_wZoHFpswXaoQ0MSdpq_qaRJyYfvvZkynyI1jrpeG-M-qHTPcoJUgFfZ74kTDPGWB2rbnY-IckyJnJhUy9E0NxHDl_tAXEnEgMvnr01b1xRkYZnKgLfNNKY2nTubV-6CLw9FVm-jIiG2YNwkyRn-EHy_I9R9I_GsUO3oXsTiK1QxAQO1Tnie8DEkLg_w2sIwGFtAUZJJXIuJ3BjLbZMYK93-Jf2cu03-ljzUMnemKxdnka2m_vEcGZcYH5mEKcla45XM07p9x_YaW4Xs1",
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
        submitted={""}
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
