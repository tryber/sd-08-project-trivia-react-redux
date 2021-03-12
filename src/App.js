import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './bootstrap.css';
import './App.css';
import Login from './Pages/Login';
import Questions from './Pages/Questions';
import Feedback from './Pages/Feedback';
import Ranking from './Pages/Ranking';
import Settings from './Pages/Settings';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/questions" component={ Questions } />
      <Route exact path="/feedback" component={ Feedback } />
      <Route exact path="/ranking" component={ Ranking } />
      <Route exact path="/settings" component={ Settings } />
    </Switch>
  );
}
