import React from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import Main from './components/Main';

class Jogar extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <>
        <Header />
        <Main history={ history } />
      </>
    );
  }
}

Jogar.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Jogar;
