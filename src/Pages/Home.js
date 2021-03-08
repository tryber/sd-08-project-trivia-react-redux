import React from 'react';
import PropTypes from 'prop-types';
import Login from './Login';

class Home extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <Login props={ this.props } />
        <button
          type="button"
          onClick={ () => history.push('/config') }
          data-testid="btn-settings"
        >
          Configurações
        </button>
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Home;
