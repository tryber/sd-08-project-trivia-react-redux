import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Trivia from './pages/Trivia';
import Login from './pages/Login';

export default function App() {
  return (
    <Switch>
      <Route to="/" component={ Login } />
      <Route to="/trivia" component={ Trivia } />
      <Route to="/config" component={ Config } />
    </Switch>
  );
}
