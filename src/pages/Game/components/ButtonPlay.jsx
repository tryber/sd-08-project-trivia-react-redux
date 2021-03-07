import React from 'react';

export default function ButtonPlay(props) {
  return (
    <button
      type="button"
      data-testid="btn-play-again"
      { ...props }
    >
      Jogar novamente

    </button>
  );
}
