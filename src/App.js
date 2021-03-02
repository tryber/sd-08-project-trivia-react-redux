import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Feedback from './pages/Feedback';
import Trivia from './pages/Trivia';
import Config from './pages/Config';

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
