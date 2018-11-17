import React, {Component} from 'react'
import Pool from './Pool.js'
import axios from 'axios'

export default class Pools extends Component{
  constructor(props){
    super(props)
    this.state={
      myPools:this.props.pools_list
    }

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
        {this.props.pools_list.map((pool,index)=> <Pool
        inspectionId={pool["inspection"]}
        site={pool["Sample Location"]? pool["Sample Location"] : null}
        collection_date={pool["Date Collected"]? pool["Date Collected"]:null}
        results={pool["Result"] ? pool["Result"] : null}
        sampleType={pool["Sample Type"] ? pool["Sample Type"] : null}
        bioSampleResult={pool["Biological Sample Result"] ? pool["Biological Sample Result"]:null}
        chemSampleResult={pool["Chemical Sample Result"] ? pool["Chemical Sample Result"] : null}
        comments={pool["Field Notes"] ? pool["Field Notes"] : null}
        user={pool["Sample ID"] ? pool["Sample ID"]: null}
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
