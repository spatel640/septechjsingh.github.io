import React,{Component} from 'react'



export default class Pool extends Component{
  constructor(props){
    super(props)
    this.state={
      failed:false,
      "Coliform Results":this.props.coliform,
      "Collection Date":this.props.collection_date,
      "Valid Results":this.props.valid_sample,
      "Sample ID":this.props.sample_id,
      "E. Coli Results":this.props.ecoli,
      "HPC":this.props.hetero,
      "Notes":this.props.comments,
      "Name" :this.props.submitted_by,
      submit: false
    }
    this.handleInput=this.handleInput.bind(this)

}

componentWillMount(){
  if(!this.props.submitted){
    this.setState({
      readOnly:false
    })
  }
}


  handleInput(e){
    e.preventDefault()
    var name=e.target.name
    var value=e.target.value
    if(e.target.type != "checkbox"){

      this.setState({[name]: value})

    } else{
      this.setState({submit: e.target.checked})
      debugger
      this.props.manageInput(this.props.id-1, name, value )
    }

  }

  render(){
    return(
      <tr>
        <td> <input type="date" name="Collection Date"  value={this.state["Collection Date"]} onChange={this.handleInput} readOnly={this.props.read}/> </td>
        <td> <input type="text" name="Sample ID" value={this.state["Sample ID"]} onChange={this.handleInput} readOnly={this.props.read}/> </td>
        <td> <input type="text" name="Valid Results" value={this.state["Valid Results"]} onChange={this.handleInput} readOnly={this.props.read}/> </td>
        <td> <input type="text" name="E. Coli Results" value={this.state["E. Coli Results"]} onChange={this.handleInput} readOnly={this.props.read}/> </td>
        <td> <input type="text" name="HPC" value={this.state["HPC"]} onChange={this.handleInput} readOnly={this.props.read}/> </td>
        <td> <input type="text" name="Coliform Results" value={this.state["Coliform Results"]} onChange={this.handleInput} readOnly={this.props.read}/> </td>
        <td> <input type="textarea" name="Notes" value={this.state["Notes"]} onChange={this.handleInput} readOnly={this.props.read}/> </td>
        <td> <input type="text" name="Name" value={this.state["Name"]}  onChange={this.handleInput} readOnly={this.props.read}/> </td>
        <td> <input type="checkbox" name="submit"  checked={this.props.submit} onChange={this.handleInput}  disabled={this.props.read} /> </td>
      </tr>
    )
  }

}
