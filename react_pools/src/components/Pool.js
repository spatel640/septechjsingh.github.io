import React,{Component} from 'react'



export default class Pool extends Component{
  constructor(props){
    super(props)
    this.state={
      "Coliform Results":this.props.coliform,
      "Collection Date":this.props.collection_date,
      "Valid Results":this.props.valid_sample,
      "Sample ID":this.props.sample_id,
      "E. Coli Results":this.props.ecoli,
      "HPC":this.props.hetero,
      "Notes":this.props.comments,
      "Name" :this.props.submitted_by,
      submit: false,
      failed:false,
      notValid:false
    }
    this.handleInput=this.handleInput.bind(this)
    this.isReadyForSubmit=this.isReadyForSubmit.bind(this)
}

componentWillMount(){
  if(!this.props.submitted){
    this.setState({
      readOnly:false
    })
  }
}


  handleInput(e){

    var name=e.target.name
    var value=e.target.value
    if(e.target.type != "checkbox"){
      this.setState({[name]: value})

    } else{

      if(e.target.checked){
        if(this.isReadyForSubmit()){    this.setState({submit: true})
        let fields=this.getFieldsInfo()
        this.props.manageInput(this.props.id-1, fields, this.props.id)
        }else{
        this.setState({notValid : true})
      }
    }
  }
}

isReadyForSubmit(){
  return !Object.values(this.state).includes("")
}

getFieldsInfo(){
  var fields={
    "Collection Date":this.state["Collection Date"],
    "Sample ID": this.state["Sample ID"],
    "Valid Results": this.state["Valid Results"],
    "E. Coli Results": this.state["E. Coli Results"],
    "Coliform Results": this.state["Coliform Results"],
    "HPC": this.state["HPC"],
    "Notes": this.state["Notes"],
    "Name": this.state["Name"],
    "SubmitResults": true
  }
  return fields
}

  render(){
    return(
      <tr className={this.state.notValid ? "validationError": ""}>
        <td> <input type="date" name="Collection Date"  value={this.state["Collection Date"]} onChange={this.handleInput} readOnly={this.props.read}/> </td>
        <td> <input type="text" name="Sample ID" value={this.state["Sample ID"]} onChange={this.handleInput} readOnly={this.props.read}/> </td>
        <td> <input type="text" name="Valid Results" value={this.state["Valid Results"]} onChange={this.handleInput} readOnly={this.props.read}/> </td>
        <td> <input type="text" name="E. Coli Results" value={this.state["E. Coli Results"]} onChange={this.handleInput} readOnly={this.props.read}/> </td>
        <td> <input type="text" name="HPC" value={this.state["HPC"]} onChange={this.handleInput} readOnly={this.props.read}/> </td>
        <td> <input type="text" name="Coliform Results" value={this.state["Coliform Results"]} onChange={this.handleInput} readOnly={this.props.read}/> </td>
        <td> <input type="textarea" name="Notes" value={this.state["Notes"]} onChange={this.handleInput} readOnly={this.props.read}/> </td>
        <td> <input type="text" name="Name" value={this.state["Name"]}  onChange={this.handleInput} readOnly={this.props.read}/> </td>
        <td> <input type="checkbox" name="submit"  checked={this.state["submit"]} onClick={this.handleInput}  disabled={this.props.read} /> </td>
      </tr>
    )
  }

}
