import React from 'react';

import './feedbackPage.css';

class FeedbackPage extends React.Component {
  render() {
    return (
      <>
        <header className="header-feedback">
          <div>
            <img
              src="https://www.gravatar.com/avatar/U2FsdGVkX1/0pruu96nX+mxAf7RfQMQkMZtZkuRzURjq4qlGV8CuxdxxfiNbXApZ"
              alt="logo-gravatar"
            />
            <p data-testid="header-player-name">Nome da pessoa aqui.</p>
          </div>
          <p data-testid="header-score">Placar total aqui.</p>
        </header>
        <section>
          <p data-testid="feedback-text">Podia ser melhor... menor que 3</p>
          <p data-testid="feedback-text">Mandou bem! maior ou igual 3</p>

          {/* Placar aqui - 14*/}
          <p data-testid="feedback-total-score">Placar final</p>
          <p data-testid="feedback-total-question">Número de acertos</p>

          {/* Botão jogar novamente - 15 */}
          <button type="button" data-testid="btn-play-again">Jogar novamente</button>

          {/* Tela de ranking - 16 */}
          {/* A tela de ranking deve possuir um título com o atributo data-testid contendo o valor ranking-title */}
          <button type="button" data-testid="btn-ranking">Ver Ranking</button>
        </section>
      </>
    );
  }
}

export default FeedbackPage;
