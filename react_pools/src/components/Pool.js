import React,{Component} from 'react'



export default class Pool extends Component{
  constructor(props){
    super(props)
    this.state={
      collection_date:'',
      sample_id:'',
      valid_results:'',
      ecoli:'',
      hpc:'',
      coliform:'',
      notes:'',
      dateValidated:true
    }
    this.handleInput=this.handleInput.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)

}


  handleInput(e){
    var name=e.target.name
    var value=e.target.value
    this.setState({
      [name]: value
    })
  }

handleSubmit(e){
  e.preventDefault()
  var dateValidated=this.isDateValid(this.state.collection_date)
  this.setState({
    dateValidated:dateValidated
  })
  if(this.state.dateValidated){
    var fields=this.getFieldsInfo();
    this.props.updateTable(fields)
  }
}


isDateValid(date){
  let inputTime = new Date(date).getTime();
  let currentTime = Math.round((new Date).getTime() / 86400000) * 86400000;
  return inputTime <= currentTime
}

getFieldsInfo(){
  var fields={
    "Collection Date":this.state.collection_date,
    "Sample ID": this.state.sample_id,
    "Valid Results": this.state.valid_results,
    "E. Coli Results": this.state.ecoli,
    "Coliform Results": this.state.coliform,
    "HPC": this.state.hpc,
    "Notes": this.state.notes,
    "Name": this.props.currentUser,
  }
  return fields
}

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        {this.state.dateValidated ? null : <div className="error">Collection date should not be in the future</div>}
        <label>Collection Date:</label>
        <input type="date" name="collection_date" required value={this.state.collection_date} onChange={this.handleInput}/>
        <label>Sample ID: </label>
        <input type="text" name="sample_id" value={this.state.sample_id} required onChange={this.handleInput}/>
        <label>Valid Sample: </label>
        <select value={this.state.valid_results} name="valid_results" required onChange={this.handleInput} >
          <option name=""></option>
          <option name="Yes">Yes</option>
          <option name="No">No</option>
        </select>
        <label>Ecoli: </label>
        <select value={this.state.ecoli} name="ecoli" required onChange={this.handleInput}>
          <option name=""></option>
          <option name="Absent">Absent</option>
          <option name="Not Taken">Not Taken</option>
          <option name="Present">Present </option>
        </select>
        <label>Hetero: </label>
        <select value={this.state.hpc} name="hpc" required onChange={this.handleInput} >
          <option name=""></option>
          <option name="< 200">{"< 200"}</option>
          <option name="> 200">{"> 200"}</option>
          <option name="TNC">TNC </option>
        </select>
        <label>Coliform: </label>
        <select value={this.state.coliform} name="coliform" required onChange={this.handleInput}>
          <option name=""></option>
          <option name="Absent">Absent</option>
          <option name="Not Taken">Not Taken</option>
          <option name="Present">Present </option>
        </select>
        <label>Comments: </label>
        <textarea  name="notes"  onChange={this.handleInput} value={this.state.notes} > </textarea>
        <label>Submitted By: </label>
        <input type="text" name="name" value={this.props.currentUser} required disabled={true}/>
        <input type="submit" value="Submit" className="yellow-button"/>
        {this.state.notValid ? <div className="error">All fields except for 'Comments' are required</div> : null}
      </form>

    )
  }

}
