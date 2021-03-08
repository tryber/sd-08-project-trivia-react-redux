import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Configurations from './pages/Configurations';
import Game from './pages/Game';
import Login from './pages/Login';
import Feedback from './pages/Feedback';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <Switch>
      <Route path="/ranking" component={ Ranking } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/game" component={ Game } />
      <Route exact path="/configurations" component={ Configurations } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
