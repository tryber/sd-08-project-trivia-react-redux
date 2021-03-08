import React, { Component } from 'react';
import Header from '../common/components/Header/Header';
import GameQuestion from '../common/components/content/GameQuestion';

class Game extends Component {
  render() {
    return (
      <>
        <Header />
        <GameQuestion />
      </>
    );
  }
}

export default Game;
