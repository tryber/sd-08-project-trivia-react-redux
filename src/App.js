import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import ConfigScreen from './pages/ConfigScreen';
import ConfigButton from './components/ConfigButton';
import Home from './pages/Home';
import './App.css';
import GameScreen from './pages/GameScreen';

function App() {
  return (
    <Switch>
      <Route path="/configscreen" component={ ConfigScreen } />
      <ConfigButton />
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
