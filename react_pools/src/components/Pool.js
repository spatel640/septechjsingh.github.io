import React,{Component} from 'react'



export default class Pool extends Component{
  constructor(props){
    super(props)
    this.state={
      facility:this.props.facility,
      site:this.props.site,
      lab:this.props.lab,
      collection_date:'',
      sample_id:this.props.sample_id,
      failed:false
    }
    this.handleInput=this.handleInput.bind(this)
}





  handleInput(e){
    this.setState(
      {
        [e.target.name] : e.target.value
      }
    )
  }

  render(){
    return(
      <tr>
        <td> <input type="text" name="sample_location" value={this.props.site} onChange={this.handleInput}/> </td>
        <td> <input type="text" name="collection_date" value={this.props.collection_date} onChange={this.handleInput}/> </td>
        <td> <input type="text" name="results" value={this.props.results} onChange={this.handleInput}/> </td>
        <td> <input type="text" name="sample_type" value={this.props.sampleType} onChange={this.handleInput}/> </td>
        <td> <input type="text" name="bio_sample" value={this.props.bioSampleResult} onChange={this.handleInput}/> </td>
        <td> <input type="text" name="chem_sample" value={this.props.chemSampleResult} onChange={this.handleInput}/> </td>
        <td> <input type="textarea" name="comments" value={this.state.checklistId} onChange={this.handleInput}/> </td>
        <td> <input type="text" name="user" value={this.props.user} onChange={this.handleInput}/> </td>
        <td> <input type="text" name="submitted" value={this.props.submitted ? "Y" : "N"} onChange={this.handleInput}/> </td>
      </tr>
    )
  }

}
