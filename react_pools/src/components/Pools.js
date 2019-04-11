import React, {Component} from 'react'
import axios from 'axios'
import Pool from './Pool.js'
import Message from './Message.js'

export default class Pools extends Component{

  constructor(props){
    super(props)
    this.state={
      showButton:false,
      currentTable:[],
      blankRows:[],
      failedLoad:false,
      processing:false,
      updateStatus:'',
      showResponse:false,
      isEditable:false,
      status:''
    }
    this.getPoolTestTable=this.getPoolTestTable.bind(this)
    this.handleClick=this.handleClick.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
    this.submitResults=this.submitResults.bind(this)
    this.isEditable=this.isEditable.bind(this)
  }

  componentWillReceiveProps(nextProps){
    if((this.props.currentRecord!== nextProps.currentRecord || this.props.currentInspection !== nextProps.currentInspection || this.props.currentChecklist !== nextProps.currentChecklist) || (nextProps.currentItemId == "")){
      this.setState({
        currentTable :Object.assign([], []),
        showResponse:false
      })
    }else if(this.props.currentItemId !== nextProps.currentItemId){
      console.log(this.props.currentRecord)
      console.log(this.props.currentInspection)
      console.log(this.props.currentChecklist)
      this.getPoolTestTable(nextProps.currentItemId)
    }
  }



  getPoolTestTable(itemId){
       axios.get(`https://apis.accela.com/v4/inspections/${this.props.currentInspection}/checklists/${this.props.currentChecklist}/checklistItems/${itemId}/customTables`, this.props.header)
       .then(function(data){
         return data.data.result
       }.bind(this))
       .then(function(data){
         return data.filter(table=> table.id=="POOL_LIC-OUTSIDE.cLAB.cPOOL.cSAMPLES")
       })
       .then(function(poolTable){
         var rows= poolTable[0].rows== undefined ? [] : poolTable[0].rows
         var canAdd=this.isEditable(rows)
         this.setState({
           currentTable:Object.assign([], rows),
           isEditable : canAdd,
           failedLoad:false
         })
       }.bind(this))
       .catch((error)=>{
         this.setState({
           failedLoad:true
         })
         console.log(`Error getting custom tables for ${itemId}`)
       })
  }

  isEditable(rows){
    var isEditable=false;
    if(this.props.isScheduled){
      if(rows.length == 0){
        isEditable= true;
      }else{
        var userListed =rows.find((row)=>{
            return row.fields["Name"]==this.props.currentUser
          })
          isEditable= userListed == undefined ? true : false
      }
    }
    return isEditable
  }

  handleClick(e){
    e.preventDefault()
    this.props.addRow()
  }


  handleSubmit(e){
    e.preventDefault();
    this.setState({
      processing:true
    })
    this.submitResults()

  }

  submitResults(fields){
    var url=`https://apis.accela.com/v4/inspections/${this.props.currentInspection}/checklists/${this.props.currentChecklist}/checklistItems/${this.props.currentItemId}/customTables`
             axios.put(url, JSON.stringify([
                    {
                    "id": "POOL_LIC-OUTSIDE.cLAB.cPOOL.cSAMPLES",
                    "rows": [
                    {
                    "action": "add",
                    "fields": fields
                    }
                    ]
                    }
                  ]), this.props.header)
                  .then(function (data){
                     this.handleResponse(data)
                   }.bind(this))
                   .then(function(){
                     this.getPoolTestTable(this.props.currentItemId)
                   }.bind(this))
                   .catch(error=>{
                     console.log(`error`)
                   })
                 }

  handleResponse(data){
    var responseText="";
    var status=data.status;
      if(data.status== 200){
        responseText="Sample Results Successfully Submited"
      }else{
        if(data.status==400){
          responseText="There was an error submitting the requested data"
        }else if (data.status==401 || data.status==403) {
          responseText="Not authorized to make this request"
        }else if (data.status == 500) {
          responseText="Cannot submit request at the time due to a server error"
        }
      }
    this.setState({
      status:status,
      updateStatus:responseText,
      showResponse:true
    })
  }





  render(){
    return(
    <div className="poolscontainer">
    {this.state.showResponse ?
       <Message class={this.state.status == 200 ? "success" : "error"} message={this.state.updateStatus} />
       : null}

    {this.state.isEditable ?
      <Pool updateTable={this.submitResults} sucess={true} currentUser={this.props.currentUser}/>
     : <ul className="instructions-main read">
       <li >Test results will be read only if an entry has been submitted by the current user for the selected week. Please contact Marion for any updates to an existing entry.</li>
     </ul>}

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
    {this.state.failedLoad ? <tr> <div className="error">There was an error retrieving results for this custom table </div></tr> : null}
      {this.state.currentTable.map((row, index)=>{

          return(
              <tr key={index}>
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

      </div>
    )
  }

}
