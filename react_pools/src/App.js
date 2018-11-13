import React, { Component } from 'react';
import './App.css';

//mycomponents
import Login from './components/Login'
import Pools from './components/Pools'

class App extends Component {




  render() {
    return (
      <div className="App">
      <Login />
      <Pools />
      </div>
    );
  }
}

export default App;
