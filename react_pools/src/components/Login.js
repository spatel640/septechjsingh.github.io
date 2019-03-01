import React, {Component} from 'react'
import axios from 'axios'

export default class Login extends Component{
  constructor(props){
    super(props)
    this.state={
      username:'',
      password:'',
      failed:false,
      
    }
    this.handleInput=this.handleInput.bind(this)
    this.requestSubmit=this.requestSubmit.bind(this)
  }

  handleInput(e){
    this.setState(
      {
        [e.target.name] : e.target.value
      }
    )
  }

  requestSubmit(e){
    e.preventDefault()
    var user=this.state.username
    var psswd=this.state.password
    this.setState(
      {
        password : ''
      }
    )
    this.props.handleSubmit(this.state.username, psswd)
  }

  render(){

    const wrongLogin= this.props.failed ? <div className="error">Your username or password is incorrect. Please try again </div> : null
    return(
      <div id={this.props.user ? "username" : "logincontainer"} onClick={this.state.handleClick}>
      {this.props.user ? <div><div id="name">{this.props.user.split('@')[0]}</div> <button id="logout" onClick={this.props.logOut} >LOGOUT </button></div>:
      <form onSubmit={this.requestSubmit} id="login">
      {wrongLogin}
        <input type='text' name='username' placeholder="Username"value={this.state.username} onChange={this.handleInput}/>
        <input type='password' name='password' value={this.state.password} onChange={this.handleInput} placeholder="Password"/>
        <input type='submit' value='LOGIN' id='login-button'/>
      </form>
    }
      </div>
    )
  }
}
