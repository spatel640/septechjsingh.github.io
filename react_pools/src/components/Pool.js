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
      name:'',
      save:'',
      notValid:false,
    }
    this.handleInput=this.handleInput.bind(this)
    this.isReadyForSubmit=this.isReadyForSubmit.bind(this)

}


  handleInput(e){
    var name=e.target.name
    var value= e.target.type == "checkbox" ? e.target.checked : e.target.value
    if(e.target.type != "checkbox"){
    this.setState({
      [name]: value
    })
    }
    if(e.target.type == "checkbox"){
      if(e.target.checked){
          if(this.isReadyForSubmit()){
            this.setState({
              [name]: true,
              notValid:false
            })
          let fields= this.getFieldsInfo(e.target.checked)
          this.props.manageInput(fields, this.props.index )
          }
          else{
          this.setState({notValid : true})
        }
      }else{
        this.setState({
          [name]: false
        })
        let fields= this.getFieldsInfo(e.target.checked)
        this.props.manageInput(fields, this.props.index)
    }
  }
}


isReadyForSubmit(){
  var valid=true
   Object.keys(this.state).forEach((key)=>{
    if(key !== "notes" && key !== "save" && key !=="notValid"&& this.state[key]== "" && !this.isDateValid(this.state.collection_date)) {
      console.log(key)
      valid=false;
    }
  })
  return valid
}

isDateValid(date){
  let inputTime = new Date(date).getTime();
  let currentTime = Math.round((new Date).getTime() / 86400000) * 86400000;
  return inputTime <= currentTime
}

getFieldsInfo(save){
  var fields={
    "Collection Date":this.state.collection_date,
    "Sample ID": this.state.sample_id,
    "Valid Results": this.state.valid_results,
    "E. Coli Results": this.state.ecoli,
    "Coliform Results": this.state.coliform,
    "HPC": this.state.hpc,
    "Notes": this.state.notes,
    "Name": this.state.name,
    "save":save
  }
  return fields
}

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
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
        <input type="text" name="name" value={this.state.name} required onChange={this.handleInput} />
        <label>Save:  </label>
        <input type="checkbox" name="save"  checked={this.state.save} onClick={this.handleInput} />
        {this.state.notValid ? <div className="error">All fields except for 'Comments' are required</div> : null}
      </form>

    )
  }

}
