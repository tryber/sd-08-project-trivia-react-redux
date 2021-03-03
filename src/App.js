import React from 'react';
import { Switch, Route } from 'react-router';
// import logo from './trivia.png';
import './App.css';
import { Login, Settings } from './pages';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/settings" component={ Settings } />
    </Switch>
  );
}
