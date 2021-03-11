import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../../components/Header';
import { actionRestScore } from '../../redux/actions/score';

import './styles.css';

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      shouldRedirect: false,
      to: '',
      saved: false,
    };
    this.savePlayerInTheRanking = this.savePlayerInTheRanking.bind(this);
  }

  savePlayerInTheRanking() {
    const { saved } = this.state;
    if (!saved) {
      this.setState({
        saved: true,
      });
      const { name, score, email } = this.props;
      const actualRanking = localStorage.getItem('ranking');
      const actualRanking2 = JSON.parse(actualRanking);
      const ranking = [
        {
          name,
          score,
          picture: email,
        },
      ];
      if (actualRanking === null) {
        localStorage.setItem('ranking', JSON.stringify(ranking));
      }
      if (actualRanking !== null) {
        const newRanking = [
          ...actualRanking2,
          { name, score, picture: email },
        ];
        localStorage.setItem('ranking', JSON.stringify(newRanking));
      }
    }
  }

  render() {
    const { score, assertions, clearScoreState } = this.props;
    const { shouldRedirect, to } = this.state;
    const THREE_ASSERTIONS = 3;
    this.savePlayerInTheRanking();
    return (
      <section>
        <Header />
        <h1 data-testid="feedback-text">
          { assertions >= THREE_ASSERTIONS
            ? 'Mandou bem! ' : 'Podia ser melhor...' }
        </h1>
        <p>
          {'Um total de '}
          <span data-testid="feedback-total-score">
            {score}
          </span>
          {' pontos'}
        </p>
        <p>
          {'Você acertou '}
          <span data-testid="feedback-total-question">
            {assertions}
          </span>
          {' questões!'}
        </p>
        <button
          data-testid="btn-ranking"
          type="button"
          onClick={ () => {
            clearScoreState();
            this.setState({
              shouldRedirect: true,
              to: '/ranking',
            });
          } }
        >
          Ver Ranking
        </button>
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ () => {
            clearScoreState();
            this.setState({
              shouldRedirect: true,
              to: '/',
            });
          } }
        >
          Jogar novamente
        </button>

        { shouldRedirect && <Redirect push to={ to } />}

      </section>
    );
  }
}

Feedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  clearScoreState: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.scoreboard.score,
  assertions: state.scoreboard.assertions,
  name: state.user.name,
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  clearScoreState: () => dispatch(actionRestScore()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
