import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Ranking extends Component {
  render() {
    return (
      <main>
        <h1 data-testid="ranking-title">Ranking</h1>

        <Link
          to="/"
          data-testid="btn-go-home"
        >
          Voltar ao início
        </Link>
      </main>
    );
  }
}

export default Ranking;
