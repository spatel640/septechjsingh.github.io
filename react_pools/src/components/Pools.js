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
    debugger

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
        poolName={pool["Name"]}
        key={index}
        id={index}
        submitInsp={pool["submit"]}
        submitted={pool["Valid Results"] ? true : false }
        manageInput={this.manageInput} /> })
      }
      </tbody>
      </table>
      <input type="submit" value="submit" onClick={this.handleSubmit} />
      </div>


    )
  }


}
