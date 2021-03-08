import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Game from './components/Game';
import Login from './components/Login';
import Ranking from './components/Ranking';
import Feedback from './components/Feedback';
import './App.css';

class App extends React.Component {
  componentDidMount() {
    localStorage.setItem('ranking', JSON.stringify([]));
  }

  render() {
    return (
      <main>
        <Switch>
          <Route path="/ranking" component={ Ranking } />
          <Route path="/game" component={ Game } />
          <Route path="/feedback" component={ Feedback } />
          <Route path="/" component={ Login } />
        </Switch>
      </main>
    );
  }
}
App.propTypes = {};
// const mapStateToProps = (state) => ({});
// const mapDispatchToProps = (dispatch) => ({});

export default connect(null, null)(App);
