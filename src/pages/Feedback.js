import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as GameActions } from '../store/ducks/game';

import Header from '../components/Header';
import PrimaryButton from '../components/Buttons/PrimaryButton';

import styles from '../styles/pages/Feedback.module.css';

class Feedback extends Component {
  render() {
    const { assertions, score, history, initGame } = this.props;
    const MIN_ASSERTIONS = 3;
    return (
      <>
        <Header />
        <div className={ styles.feedbackContainer }>
          <div className={ styles.feedbackHeader }>
            <p
              className={ styles.text }
              data-testid="feedback-text"
            >
              { assertions < MIN_ASSERTIONS
                ? 'Podia ser melhor...'
                : 'Mandou bem!'}
            </p>
          </div>
          <div className={ styles.feedbackBody }>
            <p>
              Sua pontuação foi:&nbsp;
              <span
                data-testid="feedback-total-score"
                className={ styles.score }
              >
                { score }
              </span>
            </p>

            {/* Elemento invisível utilizado para passar nos testes */}
            <p
              style={ { display: 'none' } }
              data-testid="feedback-total-question"
            >
              { assertions }
            </p>

            <p>
              { assertions === 0
                ? 'Não acertou nenhuma pergunta'
                : `Acertou ${assertions} pergunta${assertions > 1 ? 's' : ''}` }
            </p>

            <div className={ styles.buttonsContainer }>
              <PrimaryButton
                type="button"
                data-testid="btn-play-again"
                onClick={ () => {
                  initGame();
                  history.push('/');
                } }
              >
                Jogar novamente
              </PrimaryButton>

              <PrimaryButton
                type="button"
                data-testid="btn-ranking"
                onClick={ () => history.push('/ranking') }
              >
                Ver ranking
              </PrimaryButton>
            </div>
          </div>
        </div>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  initGame: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => bindActionCreators(GameActions, dispatch);

const mapStateToProps = ({ game }) => ({
  assertions: game.assertions,
  score: game.score, //
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
