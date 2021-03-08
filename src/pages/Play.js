import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header, CardQuestions } from '../components';

class Play extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Header />
        <CardQuestions history={ history } />
      </div>
    );
  }
}

Play.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Play;
