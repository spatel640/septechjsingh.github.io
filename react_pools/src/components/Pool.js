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
    debugger
    this.setState(
      {
        [e.target.name] : e.target.value
      }
    )
  }

  render(){
    return(
      <tr>
        <td>
          <input type="text" name="pool_facility" value={this.props.facility} onChange={this.handleInput}/>
        </td>
        <td>
          <input type="text" name="pool_site" value={this.props.site} onChange={this.handleInput}/>
        </td>
        <td>
          <input type="text" name="collection_date" value={this.props.collection_date} onChange={this.handleInput}/>
        </td>
        <td>
          <input type="text" name="results" value={this.props.results} onChange={this.handleInput}/>
        </td>
        <td>
            <input type="text" name="coliform" value={this.props.coliform} onChange={this.handleInput}/>
        </td>
        <td>
              <input type="text" name="ecoli" value={this.props.ecoli} onChange={this.handleInput}/>
        </td>
        <td>
                <input type="text" name="heterotropic" value={this.props.heterotropic} onChange={this.handleInput}/>
        </td>
        <td>
                  <input type="textarea" name="comments" value={this.props.comments} onChange={this.handleInput}/>
        </td>
        <td>
                    <input type="text" name="user" value={this.props.user} onChange={this.handleInput}/>
        </td>
        <td>
                <input type="text" name="submitted" value={this.props.submitted ? "Y" : "N"} onChange={this.handleInput}/>    
        </td>

      </tr>
    )
  }

}
