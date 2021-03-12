import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import Play from './Pages/Play';
import Settings from './Pages/Settings';
import Feedback from './Pages/Feedback';
import Ranking from './Pages/Ranking';
import criatrivia from './images/criatrivia.png';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={ criatrivia } className="criatrivia" alt="criatrivia_group" />
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/play">
            <Play />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/feedback">
            <Feedback />
          </Route>
          <Route exact path="/ranking">
            <Ranking />
          </Route>
        </Switch>
      </header>
    </div>
  );
}
