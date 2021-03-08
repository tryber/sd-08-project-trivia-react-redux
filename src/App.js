import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { Login, Play, Settings, Feedback, Ranking } from './pages';

export default function App() {
  return (
    <div className="App h-100">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Play } />
        <Route path="/settings" component={ Settings } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
      </Switch>
    </div>
  );
}
