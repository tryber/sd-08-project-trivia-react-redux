import React from 'react';
import { useHistory } from 'react-router-dom';

function ButtonRanking(props) {
  const history = useHistory();
  const handleClick = () => {
    history.push('/ranking');
  };
  return (
    <button
      type="button"
      data-testid="btn-ranking"
      onClick={ handleClick }
      { ...props }
      className="button-base"
    >
      Ver Ranking
    </button>
  );
}

export default ButtonRanking;
