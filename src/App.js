import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Jogo from './pages/Jogo';
import './styles/global.css';

export default function App() {
  return (
    <Switch>
      <Route path="/jogo" render={ (props) => <Jogo { ...props } /> } />
      <Route exact path="/" render={ (props) => <Home { ...props } /> } />
    </Switch>
  );
}
