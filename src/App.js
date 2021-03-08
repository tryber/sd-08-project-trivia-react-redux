import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Feedback from './pages/Feedback';
import Rank from './pages/Rank';
import Settings from './pages/Settings';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route path="/rank" component={ Rank } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/game" component={ Game } />
      <Route path="/settings" component={ Settings } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
