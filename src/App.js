import React from 'react';
import { Switch, Route } from 'react-router';
// import logo from './trivia.png';
import './App.css';
import { Login, TriviaGame, Settings, Feedback, Ranking } from './pages';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/triviagame" component={ TriviaGame } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/settings" component={ Settings } />
        <Route path="/ranking" component={ Ranking } />
      </Switch>
    </div>
  );
}
