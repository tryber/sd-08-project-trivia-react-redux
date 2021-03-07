import React from 'react';
import { useSelector } from 'react-redux';
import * as player from '../core/player';

export default function Header() {
  const getGravatar = () => player.gravatarUrl(player.getPlayer().player.gravatarEmail);
  const game = useSelector((state) => state.game);

  return (
    <header>
      <img data-testid="header-profile-picture" alt="img" src={ getGravatar() } />
      <p data-testid="header-player-name">{ player.getPlayer().player.name}</p>
      <p data-testid="header-score">{ game.score }</p>
    </header>
  );
}
