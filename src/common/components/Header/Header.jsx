import React, { Component } from 'react';
import { getCurrentPlayerInfos } from '../../../services/localStorage';

class Header extends Component {
  render() {
    // const ranking = localStorage.getItem('ranking');
    // const { name, picture, score } = JSON.parse(ranking);
    const { name, picture, score } = getCurrentPlayerInfos();
    return (
      <header>
        <section>
          <span data-testid="header-player-name">{ name }</span>
          <figure>
            <img
              src={ picture }
              alt={ `${name}` }
              data-testid="header-profile-picture"
            />
          </figure>
          <span data-testid="header-score">{Number(score)}</span>
        </section>
      </header>
    );
  }
}

export default Header;
