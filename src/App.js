import React from 'react';

import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';
import Game from './pages/Game';
import Feedback from './components/Feedback';
import Ranking from './components/Ranking';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/game" exact component={ Game } />
        <Route path="/feedback" exact component={ Feedback } />
        <Route path="/ranking" exact component={ Ranking } />
      </Switch>
    );
  }
}

export default App;
