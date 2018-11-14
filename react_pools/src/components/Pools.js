import React, {Component} from 'react'
import Pool from './Pool.js'


export default class Pools extends Component{
  constructor(props){
    super(props)
  }


  render(){
    return(
      <div>
      <table>
      <tr>
        <th>Pool Facility</th>
        <th>Pool Site</th>
        <th>Sample Collection Date</th>
        <th>Results</th>
        <th>Coliform</th>
        <th>Ecoli</th>
        <th>Heterotropic</th>
        <th>Comments</th>
        <th>User</th>
        <th>Submitted</th>
      </tr>
        {this.props.pools_list.map((pool,index)=> <Pool facility={pool["Pool_Facility"]}
        site={pool["Pool_Site"]}
        collection_date={pool["Sample_Collection_Date"]}
        results={pool["Valid_Results"]}
        coliform={pool["Total_Coliform_Result"]}
        ecoli={pool["Ecoli_Results"]}
        heterotropic={pool["Heterotropic_Results"]}
        comments={pool["Comments"]}
        user={pool["Your_Name"]}
        key={index}
        submitted={pool["Valid_Results"] ? true : false }
        /> )
      }
        <input type="submit" value="submit" onClick={this.props.handleSubmit} />
      </table>
      </div>


    )
  }


}
