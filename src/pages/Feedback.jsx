import React, { Component } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const mensagem = '';

    return (
      <>
        <Header />
        <main>
          <p data-testid="feedback-text">{mensagem}</p>
          <p data-testid="feedback-total-question">
            Você acertou:
            {/* {score} */}
            perguntas.
          </p>
          <p data-testid="feedback-total-score">
            Seu placar foi:
            {/* {acertos} */}
          </p>
          <p data-testid="feedback-total-score">Seu placar foi: 0.</p>
          <p data-testid="feedback-total-question">Você acertou: 0 perguntas.</p>

          <p data-testid="feedback-text">Mandou bem!</p>
          <p data-testid="feedback-text">Podia ser melhor ....</p>

          <Link to="/ranking">
            <button type="button" data-testid="btn-ranking"> Ver o Ranking </button>
          </Link>

        </main>

      </>
    );
  }
}

// const mapStateToProps = (state) => ({
//   email: state.login.email,
//   name: state.login.name,
// })

Feedback.propTypes = {
//  acertos: PropTypes.number.isRequired,
  // score: PropTypes.number.isRequired,
};

const mapStateToProps = () => ({
  // acertos: state.user.player.assertions,
  // score: state.user.player.score,
});

export default connect(mapStateToProps)(Feedback);
