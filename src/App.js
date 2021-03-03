import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Config from './pages/Config';
import Feedback from './pages/Feedback';
import Login from './pages/Login';
import Trivia from './pages/Trivia';

export default function App() {
  return (
    <Switch>
      <Route path="/trivia" component={ Trivia } />
      <Route path="feedback" component={ Feedback } />
      <Route path="/config" component={ Config } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}
