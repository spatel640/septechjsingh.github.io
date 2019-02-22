import React, {Component} from 'react'
import Pool from './Pool.js'


export default class Pools extends Component{

  constructor(props){
    super(props)
    this.state={
      showButtons:false,
      blankRows:[]
    }
    this.handleClick=this.handleClick.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    this.addPoolRow=this.addPoolRow.bind(this)
    this.updateRows=this.updateRows.bind(this)
  }

  handleClick(e){
    e.preventDefault()
    this.props.addRow()
  }

  componentDidMount(){
    this.setState({ showButtons: true})
  }

  handleSubmit(e){
    e.preventDefault();
    var submitResults=this.state.blankRows
    this.props.handleSubmit(submitResults)
  }


  addPoolRow(e){
    e.preventDefault(e)
    this.setState({
      blankRows:[...this.state.blankRows, {}]
    })

  }

  updateRows(fields, index){
  var updatedPools=this.state.currentTable
  this.setState({
    blankRows:[...this.state.blankRows.slice(0,index),
    Object.assign({}, {fields:fields, postStatus:'', index:index }),
    ...this.state.blankRows.slice(index+1)]
  })
  }

  render(){
    return(
      <div>
      <table>
      <tbody>
      <tr>
      <th>Collection Date</th>
      <th>Sample ID</th>
      <th>Valid Sample</th>
      <th>Ecoli</th>
      <th>Hetero</th>
      <th>Coliform</th>
      <th>Comments</th>
      <th>Submitted By</th>
      </tr>
      {this.props.poolsList.map((row, index)=>{
          return(
              <tr>
              <td> {row.fields["Collection Date"]} </td>
              <td>  {row.fields["Sample ID"]}</td>
              <td>{row.fields["Valid Results"]}</td>
              <td>{row.fields["E. Coli Results"]}</td>
              <td>{row.fields["HPC"]}</td>
              <td>{row.fields["Coliform Results"]}</td>
              <td>{row.fields["Notes"]}</td>
              <td>{row.fields["Name"]}</td>
              </tr>)
            }
      )}
      </tbody>
      </table>

      {this.state.showButtons ?
      <div className="buttons">
      <button onClick={this.addPoolRow}>Add Pool Sample Result</button>
      <button onClick={this.handleSubmit}>Submit Pool Sample Results </button>
      {this.state.blankRows.map((row, index)=>{
          return <Pool manageInput={this.updateRows} sucess={true} index={index} key={index}/>
      })
    }

      </div> : null}
      </div>
    )
  }

}
