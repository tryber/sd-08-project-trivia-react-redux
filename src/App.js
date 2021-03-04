import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Jogo from './pages/Jogo';
import Set from './pages/Set';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/jogo" render={ (props) => <Jogo { ...props } /> } />
        <Route exact path="/" render={ (props) => <Home { ...props } /> } />
        <Route path="/set" render={ (props) => <Set { ...props } /> } />
      </Switch>
    </div>
  );
}
