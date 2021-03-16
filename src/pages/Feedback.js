import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';

const CryptoJS = require('crypto-js');

class Feedback extends React.Component {
  constructor() {
    super();

    this.renderConditional = this.renderConditional.bind(this);
    this.handleHome = this.handleHome.bind(this);
    this.handleRanking = this.handleRanking.bind(this);
    this.localStorageSaveRanking = this.localStorageSaveRanking.bind(this);
  }

  handleHome() {
    const { history } = this.props;
    history.push('/');
  }

  handleRanking() {
    const { history } = this.props;
    history.push('/ranking');
  }

  localStorageSaveRanking() {
    const { score, name, email } = this.props;

    const md5Converter = () => {
      const textMd5 = CryptoJS.MD5(email).toString();
      return textMd5;
    };

    const playerOnLocalStorage = {
      name, score, picture: `https://www.gravatar.com/avatar/${md5Converter()}`,
    };
    if (localStorage.getItem('ranking')) {
      const ranking = JSON.parse(localStorage.getItem('ranking'));
      ranking.push(playerOnLocalStorage);
      const rankingSorted = ranking.sort(
        (playerA, playerB) => playerB.score - playerA.score,
      );
      localStorage.setItem('ranking', JSON.stringify(rankingSorted));
    } else {
      localStorage.setItem('ranking', JSON.stringify([playerOnLocalStorage]));
    }
  }

  renderConditional() {
    const { assertions, score } = this.props;
    const number = 3;
    if (assertions && assertions >= number) {
      return (
        <div>
          <h4 data-testid="feedback-text">Mandou bem!</h4>
          <h4>
            {`Você acertou ${' '}`}
            <span data-testid="feedback-total-question">{ assertions }</span>
            {`${' '} perguntas :)`}
          </h4>
          <h4>
            {`Seu placar final foi ${' '}`}
            <span data-testid="feedback-total-score">{ score }</span>
          </h4>
        </div>
      );
    }
    return (
      <div>
        <h4 data-testid="feedback-text">Podia ser melhor...</h4>
        <h4>
          {`Você acertou ${' '}`}
          <span data-testid="feedback-total-question">{ assertions }</span>
          {`${' '} perguntas :)`}
        </h4>
        <h4>
          {`Seu placar final foi ${' '}`}
          <span data-testid="feedback-total-score">{ score }</span>
        </h4>
      </div>
    );
  }

  render() {
    this.localStorageSaveRanking();

    return (
      <div>
        <Header />
        <h1>Feedback Page</h1>
        { this.renderConditional() }
        <button
          type="submit"
          className="button-jogar"
          data-testid="btn-play-again"
          onClick={ this.handleHome }
        >
          Jogar novamente
        </button>
        <button
          type="button"
          className="button-jogar"
          data-testid="btn-ranking"
          onClick={ this.handleRanking }
        >
          Ver Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.game.assertions,
  score: state.game.score,
  email: state.game.email,
  name: state.game.name,
});

export default connect(mapStateToProps)(Feedback);

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
