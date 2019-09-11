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
      dateValidated:true,
      disableButton:false
    }
    this.handleInput=this.handleInput.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    this.processSubmission=this.processSubmission.bind(this)
}


  handleInput(e){
    var name=e.target.name
    var value=e.target.value
    this.setState({
      [name]: value
    })
  }

handleSubmit(e){
  e.stopPropagation();
  e.preventDefault();
  var dateValidated=this.isDateValid(this.state.collection_date);
  if(dateValidated){
    alert('Test results will be submitted for the current pool selection');
      this.processSubmission();
  }else{
    this.setState({
      dateValidated:dateValidated
    })
  }
}

processSubmission(){
    var fields=this.getFieldsInfo();
    this.props.updateTable(fields);

}


isDateValid(date){
  let inputDatejs = new Date(date);
  let inputTime=(inputDatejs.getTime() - inputDatejs.getTimezoneOffset() * -60000 );
  let schedDatejs = new Date(this.props.scheduleDate);
  let schedTime=(schedDatejs.getTime() - schedDatejs.getTimezoneOffset() * -60000 );
  return inputTime <= schedTime
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
    "Pool Status": this.state.poolStatus
  }
  return fields
}

  render(){
    return(
      <form onSubmit={this.handleSubmit} id="sample-form">
      <ul className="instructions-main header-form">
      <li>Collection date should fall within 7 days prior to week ending date.</li>
      <li>If a pool status needs to be updated, please refer to the Pool Status dropdown.</li>
      <li>Once submitted, results cannot be changed. Please contact Marion for more info.</li>
      </ul>
        <div className="column-left">
        <label>Collection Date:</label> {this.state.dateValidated ? null : <div className="error">  Collection date should not be greater than the current inspection's scheduled date </div>}
        <input type="date" name="collection_date" required value={this.state.collection_date} onChange={this.handleInput}/>
        <label>Sample ID: </label>
        <input type="text" name="sample_id" value={this.state.sample_id} required onChange={this.handleInput}/>
        <label>Submitted By: </label>
        <input type="text" name="name" value={this.props.currentUser} required disabled={true}/>
        <label>Comments: </label>
        <textarea  name="notes"  onChange={this.handleInput} value={this.state.notes} > </textarea>
        </div>
        <div className="column-right">
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
        <input   type="submit" value="SUBMIT TEST RESULTS" className="yellow-button"  />
        </div>
      </form>

    )
  }

}
