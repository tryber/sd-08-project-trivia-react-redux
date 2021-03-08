import React from 'react';
import { useSelector } from 'react-redux';
import * as player from '../core/player';

export default function Header() {
  const getGravatar = () => player.gravatarUrl(player.getPlayer().player.gravatarEmail);
  const game = useSelector((state) => state.game);

  return (
    <header>
      <div className="header-player">
        <img
          data-testid="header-profile-picture"
          alt="img"
          src={ getGravatar() }
          className="header-player-avatar"
        />
        <section className="header-player-info">

          <span
            data-testid="header-player-name"
            className="header-player-name"
          >
            { player.getPlayer().player.name}

          </span>
          <span
            className="header-player-email"
          >
            { player.getPlayer().player.gravatarEmail}

          </span>
        </section>
      </div>

      <section className="header-score">
        <span className="header-score-label">Score:</span>
        <span
          data-testid="header-score"
          className="header-score-value"
        >
          { game.score }

        </span>
      </section>

    </header>
  );
}
