import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Feedback from './pages/Feedback';
import Trivia from './pages/Trivia';
import Config from './pages/Config';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <Switch>
      <Route path="/trivia" component={ Trivia } />
      <Route path="/ranking" component={ Ranking } />
      <Route path="/feedback" component={ Feedback } />
      <Route path="/config" component={ Config } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
