import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Gamescreen from './pages/Gamescreen';
import Settings from './pages/Settings';
import Ranking from './pages/Ranking';
import Feedback from './pages/Feedback';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/settings" component={ Settings } />
        <Route path="/ranking" component={ Ranking } />
        <Route path="/feedback" component={ Feedback } />
        <Route exact path="/gamescreen" component={ Gamescreen } />
      </Switch>
    );
  }
}

export default App;
