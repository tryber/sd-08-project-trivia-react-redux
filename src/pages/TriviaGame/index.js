import React, { Component } from 'react';
import { HeaderGame, MainGame } from '../../components';

class TriviaGame extends Component {
  render() {
    return (
      <div>
        <HeaderGame />
        <MainGame />
      </div>
    );
  }
}

export default TriviaGame;
