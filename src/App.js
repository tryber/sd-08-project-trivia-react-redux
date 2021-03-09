import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import Trivia from './Pages/Trivia';
// import Jogo from './Pages/Jogo';
import Game from './Pages/Game';
import Rank from './Pages/Rank';
import feedback from './Pages/Feedback';
import Config from './Pages/Config';

import store from './redux/store';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Provider store={ store }>
          <Switch>
            <Route component={ Trivia } exact path="/" />
            <Route component={ Game } exact path="/jogo" />
            <Route component={ Rank } exact path="/rank" />
            <Route component={ feedback } exact path="/feedback" />
            <Route component={ Config } exact path="/Config" />
          </Switch>
        </Provider>
      </BrowserRouter>
    );
  }
}

export default App;
