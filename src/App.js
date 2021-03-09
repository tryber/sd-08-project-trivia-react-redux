import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Game from './pages/Game';
import Login from './pages/Login';
import Ranking from './pages/Ranking';
import Feedback from './pages/Feedback';
import Configurations from './pages/Configurations';

import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/configurations" component={ Configurations } />
      <Route path="/game" component={ Game } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/ranking" component={ Ranking } />
    </Switch>
  );
}
