import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Play from './pages/Play';
import Ranking from './pages/Ranking';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/play" component={ Play } />
        <Route path="/ranking" component={ Ranking } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
