import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  assertionsImage() {
    const feedback = JSON.parse(localStorage.getItem('state')).player;
    const four = 4;
    if (feedback.assertions <= 2) {
      return (<img src="/naruto.jpg" className="width-300px" alt="Naruto" />);
    } if (feedback.assertions <= four) {
      return (<img src="/faustao.jpg" className="width-300px" alt="Faustão" />);
    }
    return (<img src="/milhao.jpg" className="width-300px" alt="Corn" />);
  }

  render() {
    const { history, questions } = this.props;
    const question = questions.results;
    const feedback = JSON.parse(localStorage.getItem('state')).player;
    return (
      <div>
        <Header score={ feedback.score } />
        {feedback.assertions <= 2
          ? <p data-testid="feedback-text">Podia ser melhor...</p>
          : <p data-testid="feedback-text">Mandou bem!</p>}
        { this.assertionsImage() }
        <p>
          Score:
          <span data-testid="feedback-total-score">{feedback.score}</span>
          Acertos:
          <span data-testid="feedback-total-question">{feedback.assertions}</span>
          {question === undefined ? '' : `/${question.length}`}
        </p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Jogar novamente

        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ver Ranking

        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.question.allQuestions,
});

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Feedback);
