import React from 'react';
import logo from './trivia.png';
import './App.css';
import { feedback } from './pages'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={feedback} />
      </Switch>
      {/* <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          SUA VEZ
        </p>

      </header>
    </div> */}
    </Router>

  );
}
