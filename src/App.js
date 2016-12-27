import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Calendar from './components/Calendar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>react-month-calendar</h2>
        </div>
        <Calendar />
      </div>
    );
  }
}

export default App;
