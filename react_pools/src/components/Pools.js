import React, {Component} from 'react'
import Pool from './Pool.js'


export default class Pools extends Component{

  constructor(props){
    super(props)
    this.state={
      showButtons:false
    }
    this.handleClick=this.handleClick.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    this.handleUpdate=this.handleUpdate.bind(this)
  }

  handleClick(e){
    e.preventDefault()
    this.props.addRow()
  }

  componentDidMount(){
    this.setState({ showButtons: true})
  }

  handleSubmit(index, name, value){

  }

  handleUpdate(index, name, value){
    debugger
    this.props.updateTable(index, name, value)
  }

  render(){
    return(
      <div>
      <table>
      <tr>
      <th>Collection Date</th>
      <th>Sample ID</th>
      <th>Valid Sample</th>
      <th>Ecoli</th>
      <th>Hetero</th>
      <th>Coliform</th>
      <th>Comments</th>
      <th>Submitted By</th>
      <th>Submit</th>
      </tr>
      {this.props.poolsList.map((row, index)=>{
          return <Pool
            id={row.id}
            key={index}
            collection_date={row.fields["Collection Date"]}
            sample_id={row.fields["Sample ID"]}
            valid_sample={row.fields["Valid Results"]}
            ecoli={row.fields["E. Coli Results"]}
            coliform={row.fields["Coliform Results"]}
            hetero={row.fields["HPC"]}
            comments={row.fields["Notes"]}
            submitted_by={row.fields["Name"]}
            read={row.fields["Sample ID"].length>0}
            submit=""
            manageInput={this.handleUpdate}
          />
      }
      )}
      </table>
      {this.state.showButtons ?
      <div className="buttons">
      <button onClick={this.handleClick}>Add Pool Sample Result</button>
      <button onSubmit={this.handleSubmit}>Submit Pool Sample Results </button>
      </div> : null
        }
      </div>
    )
  }

}
