import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../../components/Header';

class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalQuestions: 5,
    };
  }

  render() {
    const { totalQuestions } = this.state;
    const { rightAnswers, score } = this.props;
    return (
      <section>
        <Header />
        <h1 data-testid="feedback-text">
          { rightAnswers >= (totalQuestions / 2) ? 'Mandou bem!' : 'Podia ser melhor...' }
        </h1>
        <p data-testid="feedback-total-question">
          { `Você acertou ${rightAnswers} questões!` }
        </p>
        <p data-testid="feedback-total-score">
          { `Um total de ${score} pontos` }
        </p>
        <Link to="/ranking" className="feedback-btn" data-testid="btn-ranking">
          Ver Ranking
        </Link>
        <Link to="/" className="feedback-btn" data-testid="btn-play-again">
          Jogar novamente
        </Link>
      </section>
    );
  }
}

index.propTypes = {
  score: PropTypes.number.isRequired,
  rightAnswers: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  score: state.score.score,
  rightAnswers: state.score.rightAnswers,
});

export default connect(mapStateToProps)(index);
