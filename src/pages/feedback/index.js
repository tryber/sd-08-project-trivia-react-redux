import React, { Component } from 'react'

export default class index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalQuestions,
      score,
    }
  }

  render() {
    const { totalQuestions, score } = this.props;
    return (
      <section>
        <h1 data-testid="feedback-text">
          { totalQuestions >= 3 ? 'Mandou bem!' : 'Podia ser melhor...' }
        </h1>
        <p data-testid="feedback-total-question">Você acertou { totalQuestions } questões!</p>
        <p data-testid="feedback-total-score">Um total de { score } pontos</p>
        <button data-testid="btn-ranking">Ver Ranking</button>
        <button data-testid="btn-play-again">Jogar novamente</button>
      </section>
    )
  };
};
