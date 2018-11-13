import React,{Component} from 'react'

export default class Pool extends Component{
  constructor(props){
    super()
    this.state={
      facility:'',
      site:'',
      lab:'',
      collection_date:'',
      sample_id:'',
      failed:false
    }
    this.handleInput=this.handleInput.bind(this)

  }

  handleInput(e){
    debugger
    this.setState(
      {
        [e.target.name] : e.target.value
      }
    )
  }

  render(){
    return(
      <div>
        <label>Pool Facility</label>
          <input type="text" name="pool_facility" value={this.state.facility} onChange={this.handleInput}/>
        <label>Pool Site</label>
          <input type="text" name="pool_site" value={this.state.site} onChange={this.handleInput}/>
        <label>Lab</label>
          <input type="text" name="lab" value={this.state.lab} onChange={this.handleInput}/>
        <label>Sample Collection Date</label>
          <input type="date" name="collection_date" value={this.state.collection_date} onChange={this.handleInput}/>
        <label>Sample ID</label>
          <input type="sample_id" name="sample_id" value={this.state.sample_id} onChange={this.handleInput}/>
      </div>
    )
  }

}
