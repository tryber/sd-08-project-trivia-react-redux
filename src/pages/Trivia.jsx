import React from 'react';

class Trivia extends React.Component {
  render() {
    return (
      <header>
        <img src={ img } alt="profile-avatar" data-testid="header-profile-picture" />
        <span data-testid="header-player-name">{ userName }</span>
        <span data-testid="header-score">{ score }</span>
      </header>
    );
  }
}

export default Trivia;
