import React, {Component} from 'react'
import axios from 'axios'

export default class Login extends Component{
  constructor(props){
    super()
    this.state={
      username:'',
      password:'',
      failed:false
    }
    this.handleInput=this.handleInput.bind(this)
    this.handleSubmit=this.handleSubmit.bind(this)
  }

  handleInput(e){
    debugger
    this.setState(
      {
        [e.target.name] : e.target.value
      }
    )
  }

  handleSubmit(e){
    e.preventDefault()
    axios({
			method: 'POST',
			url: '',
			data: {username: this.state.username, password: this.state.password}
		})
		.then(resp => {

		})
			.then(resp => {
				this.props.setUsername(resp.data.username)
			})
		.catch((error) => {
			this.setState({
				failed: true
			});
		})
  }

  render(){
    return(
      <div>
      <form onSubmit={this.handleSubmit}>
        <label>Username</label>
        <input type='text' name='username' value={this.state.username} onChange={this.handleInput}/>
        <label>Password</label>
        <input type='password' name='password' value={this.state.password} onChange={this.handleInput}/>
        <input type='submit' value='Login' className='button'/>
      </form>
      </div>
    )
  }
}
