import React, {Component} from 'react'
import Pool from './Pool.js'
import axios from 'axios'

export default class Pools extends Component{
  constructor(props){
    super(props)
    this.state={
      myPools:this.props.pools_list
    }
    this.getInspChecklists=this.getInspChecklists.bind(this)
  }

  componentDidMount(){
    var header={
      "headers": {
      "authorization": "lD5KryMaW-E7S7rk-XHpU1-CPkEhxymWAezeAnHhGZVsu6TT-FQRkrhc7G2Ui34GOUkcohgCkeC8s89gXkg0hH6A3K23uyJZOqQxlDU6MVz3wyzWj0NAPjp5nf32wuFCNvn433wd1M7B82O7s6ldtwmJ2Y0U3fBqGzVqXFVt2ur75NoBI6V617SELPW8k9R6JfyD5IK9alk5CNBJ0pYQSGsjTxke9iG48AVfsqm-FfXucOZeNAbdOMjBfDoKBn8WtlUCHdUDhMh9IHh8Ot19kxpt_rBjxFFDMxtfaRmPbgjKUHa3yjh02pXDykSauGKgMuTiW_-OfGWrtCHlt3nZICPyCBxIESY9txFDHDZrQRLm693qQrZsAoDgDMUP2fLIKP6VVuIZm5gPEtawiVjqYoKcWjPhtVaQ3_m5Y6ETukA8JKaH6zrpoW2R_3kYl9aV3CTb2Pt37STXnrXrXmMwH9cpg_XdVEQoqjTcTGdfNF29xMcj8NDqHdnVYjOPv1QxAgLxjQ8FXBaJW-96aSDSlg2",
      "cache-control": "no-cache",
      "postman-token": "59acabbe-f19d-c8a1-f10d-dd1b1918b660"
    }}
    debugger
    var inspectionsListsProm= this.state.myPools.map((pool)=>{
      return new Promise(function(resolve, reject){
                axios.get(`https://apis.accela.com/v4/inspections/${pool.inspection}/checklists`,header)
               .then(data=>{
                 data.data.result.filter((list)=>list.guideType.text=="WQ Samples")
               }).then((list)=>{
                 resolve(list)
               })
               .catch(error=>{
                 debugger
                 console.log(`error getting inspections for ${pool.inspection}`)
               })
             })
             debugger
    })
    Promise.all(inspectionsListsProm).then((checklists)=>{
      debugger
    }).catch((error)=>{
      console.log("error resolving all inspection promises")
      debugger
    })
  }

  getInspChecklists(inspectionId,header){
    debugger
      axios.get(`https://apis.accela.com/v4/inspections/${inspectionId}/checklists`,header)
      .then((data)=>{
        debugger
      })
  }



  render(){
    return(
      <div>
      <table>
      <thead>
      <tr>
        <th>Sample Location</th>
        <th>Date Collected</th>
        <th>Results</th>
        <th>Sample Type</th>
        <th>Biological Sample Result</th>
        <th>Chemical Sample Result</th>
        <th>Comments</th>
        <th>User</th>
        <th>Submitted</th>
      </tr>
      </thead>
      <tbody>
        {this.state.myPools.map((pool,index)=> <Pool
        inspectionId={pool["inspection"]}
        site={pool["Sample Location"]}
        collection_date={pool["Date Collected"]}
        results={pool["Result"]}
        sampleType={pool["Sample Type"]}
        bioSampleResult={pool["Biological Sample Result"]}
        chemSampleResult={pool["Chemical Sample Result"]}
        comments={pool["Field Notes"]}
        user={pool["Sample ID"]}
        key={index}
        submitted={pool["Result"] ? true : false }
        /> )
      }
      </tbody>
      </table>
      <input type="submit" value="submit" onClick={this.props.handleSubmit} />
      </div>


    )
  }


}
