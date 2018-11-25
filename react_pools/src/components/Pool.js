import React,{Component} from 'react'



export default class Pool extends Component{
  constructor(props){
    super(props)
    this.state={
      failed:false,
      readOnly:true,
      disableCheck:false,

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
    let value=e.target.type == "checkbox" ? e.target.checked : e.target.value
    this.props.manageInput(this.props.itemId ,e.target.name, value)
  }

  render(){
    return(
      <tr>
        <td> <input type="text" name="Coliform Results" value={this.props.coliformsResults} onChange={this.handleInput} readOnly={this.props.submitted}/> </td>
        <td> <input type="text" name="Collection Date" value={this.props.collection_date} onChange={this.handleInput} readOnly={this.props.submitted}/> </td>
        <td> <input type="text" name="Valid Results" value={this.props.results} onChange={this.handleInput} readOnly={this.state.readOnly}/> </td>
        <td> <input type="text" name="Sample ID" value={this.props.sampleID} onChange={this.handleInput} readOnly={this.state.readOnly}/> </td>
        <td> <input type="text" name="E. Coli Results" value={this.props.eColiResults} onChange={this.handleInput} readOnly={this.state.readOnly}/> </td>
        <td> <input type="text" name="HPC" value={this.props.hpc} onChange={this.handleInput} readOnly={this.state.readOnly}/> </td>
        <td> <input type="textarea" name="Notes" value={this.state.comments} onChange={this.handleInput} readOnly={this.state.readOnly}/> </td>
        <td> <input type="text" name="Name" value={this.props.name}  onChange={this.handleInput} readOnly={this.state.readOnly}/> </td>
        <td> <input type="checkbox" name="submit"  checked={this.props.submit} onChange={this.handleInput}  disabled={this.state.disableCheck} /> </td>
      </tr>
    )
  }

}
