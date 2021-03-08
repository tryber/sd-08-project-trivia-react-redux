import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearToken } from '../actions';

class Ranking extends React.Component {
  render() {
    const { clearToken: clearTokenAction } = this.props;
    return (
      <section>
        <h1 data-testid="ranking-title">Ranking</h1>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ () => clearTokenAction() }
          >
            Voltar à página inicial
          </button>
        </Link>
      </section>
    );
  }
}

Ranking.propTypes = {
  clearToken: PropTypes.func.isRequired,
};

const mapDispatch = {
  clearToken,
};

export default connect(null, mapDispatch)(Ranking);
