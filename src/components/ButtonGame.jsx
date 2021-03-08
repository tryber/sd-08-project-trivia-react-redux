import React from 'react';
import { useHistory } from 'react-router-dom';

function ButtonGame(props) {
  const history = useHistory();
  const handleClick = () => {
    history.push('/game');
  };
  return (
    <button
      type="button"
      data-testid="btn-play-again"
      { ...props }
      onClick={ handleClick }
      className="button-base"
    >
      Jogar novamente

    </button>
  );
}

export default ButtonGame;
