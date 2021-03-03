import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Configurations from './pages/Configurations';
import Game from './pages/Game';
import Login from './pages/Login';

export default function App() {
  return (
    <Switch>
      <Route path="/game" component={ Game } />
      <Route exact path="/configurations" component={ Configurations } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
