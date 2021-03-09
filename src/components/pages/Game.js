import React, { Component } from 'react';
import GameHeader from './GameHeader';
import GameQuestions from './GameQuestions';

class Game extends Component {
  render() {
    return (
      <main>
        <GameHeader />
        <GameQuestions />
      </main>
    );
  }
}

export default Game;
