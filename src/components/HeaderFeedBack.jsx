import React from 'react';

export default function HeaderFeedBack() {
  const url = 'https://s.gravatar.com/avatar/6791ab1c56a700f2fc41e7fa358deeeb?s=80';
  return (
    <head>
      <img src={ url } alt="imagem avatar" data-testid="header-profile-picture" />
      <span data-testid="header-player-name">{payload.name}</span>
      <span data-testid="header-score">{payload.score}</span>
    </head>
  );
}
