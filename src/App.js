import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Home from './pages/Home';
import './App.css';
import GameScreen from './pages/GameScreen';
import ConfigScreen from './pages/ConfigScreen';
import FeedBackScreen from './pages/FeedBackScreen';
import RankingScreen from './pages/RankingScreen';

function App() {
  return (
    <Switch>
      <Route path="/ranking" component={ RankingScreen } />
      <Route path="/feedbackscreen" component={ FeedBackScreen } />
      <Route path="/configscreen" component={ ConfigScreen } />
      <Route path="/gamescreen" component={ GameScreen } />
      <Route exact path="/" component={ Home } />
    </Switch>
  );
}

const mapStateToProps = (state) => ({
  email: state.email,
  nome: state.nome,
});

export default connect(mapStateToProps)(App);
// fix
