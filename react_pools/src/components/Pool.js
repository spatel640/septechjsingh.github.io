import React,{Component} from 'react'



export default class Pool extends Component{
  constructor(props){
    super(props)
    this.state={
      failed:false,
    }
    this.handleInput=this.handleInput.bind(this)
}



  handleInput(e){
    this.props.manageInput(this.props.id ,e.target.name, e.target.value)
  }

  render(){
    return(
      <tr>
        <td> <input type="text" name="Coliform Results" value={this.props.coliformsResults} onChange={this.handleInput} readOnly={this.props.submitted}/> </td>
        <td> <input type="text" name="collection_date" value={this.props.collection_date} onChange={this.handleInput} readOnly={this.props.submitted}/> </td>
        <td> <input type="text" name="results" value={this.props.results} onChange={this.handleInput} readOnly={this.props.submitted}/> </td>
        <td> <input type="text" name="sampleID" value={this.props.sampleID} onChange={this.handleInput} readOnly={this.props.submitted}/> </td>
        <td> <input type="text" name="eColiResults" value={this.props.eColiResults} onChange={this.handleInput} readOnly={this.props.submitted}/> </td>
        <td> <input type="text" name="hpc" value={this.props.hpc} onChange={this.handleInput} readOnly={this.props.submitted}/> </td>
        <td> <input type="textarea" name="comments" value={this.state.comments} onChange={this.handleInput} readOnly={this.props.submitted}/> </td>
        <td> <input type="text" name="user" value={this.props.user}  onChange={this.handleInput} readOnly={this.props.submitted}/> </td>
        <td> <input type="checkbox" name="submitted"  onChange={this.handleInput} checked={this.props.submitInsp} disabled={this.props.submitted || !(this.props.collection_date) && !(this.props.coliformsResults) && !(this.props.results) && !(this.props.sampleID) && !(this.props.eColiResults) && !(this.props.hpc) && !(this.props.poolName)  } /> </td>
      </tr>
    )
  }

}
