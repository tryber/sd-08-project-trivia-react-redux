import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Feedback from './pages/Feedback';
import Trivia from './pages/Trivia';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/trivia" component={ Trivia } />
      {/* <Route path="/config" component={ Config } /> */}
      <Route path="feedback" component={ Feedback } />
    </Switch>
  );
}
