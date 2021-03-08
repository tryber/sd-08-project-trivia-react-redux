import React from 'react';
import Header from '../../components/Header';
import GameMatch from './components/GameMatch';

import Logo from '../../components/Logo';

function Game() {
  return (
    <main>
      <Header />
      <Logo className="main-logo" />
      <GameMatch />
    </main>
  );
}

export default Game;
