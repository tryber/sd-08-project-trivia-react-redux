import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './components/Header';

import '../styles/Feedback.css';

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.getMessage = this.getMessage.bind(this);
    this.jogarNovamente = this.jogarNovamente.bind(this);
    this.redirectToRanking = this.redirectToRanking.bind(this);
    this.saveRanking = this.saveRanking.bind(this);
  }

  componentDidMount() {
    this.saveRanking();
  }

  getMessage() {
    const { assertions } = this.props;
    const TRES = 3;
    if (assertions < TRES) {
      return 'Podia ser melhor...';
    }
    if (assertions >= TRES) {
      return 'Mandou bem!';
    }
  }

  saveRanking() {
    const { score, picture, name } = this.props;
    const player = {
      name, score, picture,
    };
    if (!localStorage.getItem('ranking')) {
      localStorage.setItem('ranking', JSON.stringify([player]));
    } else if (localStorage.getItem('ranking')) {
      const updateRank = [...JSON.parse(localStorage.getItem('ranking')), player];
      localStorage.setItem('ranking', JSON.stringify(updateRank));
    }
  }

  jogarNovamente() {
    const { history } = this.props;
    history.push('/');
  }

  redirectToRanking() {
    const { history } = this.props;
    history.push('/ranking');
  }

  render() {
    const { score, assertions } = this.props;
    return (
      <div data-testid="feedback-text">
        <Header />
        <div className="feedback-message">
          <p>{this.getMessage()}</p>
          <p>
            Pontuação total:
            <span data-testid="feedback-total-score">{score}</span>
          </p>
          <p>
            Número de acertos:
            <span data-testid="feedback-total-question">{assertions}</span>
          </p>
        </div>
        <button
          onClick={ this.jogarNovamente }
          data-testid="btn-play-again"
          type="button"
        >
          Jogar novamente
        </button>
        <button
          onClick={ this.redirectToRanking }
          data-testid="btn-ranking"
          type="button"
        >
          Ver ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.createPlayer.player.assertions,
  score: state.createPlayer.player.score,
  picture: state.setUser.gravatarUrl,
  name: state.setUser.name,
});

export default connect(mapStateToProps, null)(Feedback);
