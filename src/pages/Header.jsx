import React from 'react';

class Header extends React.Component {
  render() {
    const state = localStorage.getItem('state');
    const {
      player: { name, gravatarEmail, score },
    } = JSON.parse(state);
    return (
      <header>
        <div className="div-header">
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${gravatarEmail}` }
            alt="perfil"
          />
          <h2 data-testid="header-player-name" className="nick-name">
            {name}
          </h2>
        </div>
        <div className="score">
          Pontuação:
          {' '}
          <span data-testid="header-score">{score}</span>
        </div>
      </header>
    );
  }
}

export default Header;
