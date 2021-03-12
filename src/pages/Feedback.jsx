import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './Header';
import { actionReturnLogin } from '../redux/actions/index';

class Feedback extends Component {
  componentDidMount() {
    const { name, score, gravatarEmail } = JSON.parse(
      localStorage.getItem('state'),
    ).player;
    if (!localStorage.getItem('ranking')) {
      const ranking = [{ name, score, gravatarEmail }];
      localStorage.setItem('ranking', JSON.stringify(ranking));
    } else {
      let ranking = JSON.parse(localStorage.getItem('ranking'));
      ranking = [...ranking, { name, score, gravatarEmail }];
      localStorage.setItem('ranking', JSON.stringify(ranking));
    }
  }

  render() {
    const { score, assertions } = JSON.parse(
      localStorage.getItem('state'),
    ).player;
    const { returnLogin } = this.props;
    return (
      <>
        <Header />
        <div className="feedback">
          {assertions >= 2 + 1 ? (
            <h1 data-testid="feedback-text" className="feedback-title">
              Mandou bem!
            </h1>
          ) : (
            <h1 data-testid="feedback-text" className="feedback-title">
              Podia ser melhor...
            </h1>
          )}

          <h2>
            Pontuação final:
            {'  '}
            <span data-testid="feedback-total-score">{score}</span>
          </h2>
          <h2 className="feedback-score">
            Acertos:
            {'  '}
            <span data-testid="feedback-total-question">{assertions}</span>
          </h2>
          <Link to="/">
            <button
              className="btn btn-success"
              type="button"
              data-testid="btn-play-again"
              onClick={ () => returnLogin() }
            >
              Jogar novamente
            </button>
          </Link>
          <Link to="/ranking">
            <button type="button" data-testid="btn-ranking" className="btn btn-primary">
              Ver Ranking
            </button>
          </Link>
        </div>
      </>
    );
  }
}

Feedback.propTypes = {
  returnLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  returnLogin: () => dispatch(actionReturnLogin()),
});

export default connect(null, mapDispatchToProps)(Feedback);
