import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Jogo from './pages/Jogo';

export default function App() {
  return (

    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/jogo" component={ Jogo } />
    </Switch>

  );
}
