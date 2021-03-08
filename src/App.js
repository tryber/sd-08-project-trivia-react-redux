import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Config from './Pages/Config';
import FeedbackScreen from './Pages/Feedback';

import Home from './Pages/Home';
import Jogo from './Pages/Jogo';
import Ranking from './Pages/Ranking';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact render={ (props) => <Home { ...props } /> } />
        <Route path="/config" exact render={ (props) => <Config { ...props } /> } />
        <Route path="/jogo" exact render={ (props) => <Jogo { ...props } /> } />
        <Route
          path="/feedback"
          exact
          render={ (props) => <FeedbackScreen { ...props } /> }
        />
        <Route
          path="/ranking"
          exact
          render={ (props) => <Ranking { ...props } /> }
        />

      </Switch>
    );
  }
}

export default App;
