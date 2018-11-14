import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

//mycomponents
import Login from './components/Login'
import Pools from './components/Pools'

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      pools:[],
      token:'',
      user:'',
      key:'',
      failed:false
    }
    this.handleSubmit= this.handleSubmit.bind(this)
  }


  handleSubmit(username, password){
    axios({
      method: 'GET',
      url: '',
      data: {username: username, password}
    })
    .then(res => res.json())
      .then(pools => {
        this.setState({
          pools_list: pools["Data"],
          token:pools["Key"],
          user:username
        })
      })
    .catch((error) => {
      this.setState({
        failed: true
      });
    })
  }


  render() {
    return (
      <div className="App">
      {this.state.user ? <div> <div id="current_user">this.state.user</div>
          <Pools pools_list={this.state.pools}/> </div> : <Login handleSubmit={this.handleSubmit} failed={this.state.failed}/>}
      </div>
    );
  }
}

export default App;
