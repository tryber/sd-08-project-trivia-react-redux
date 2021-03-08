import React from 'react';
import { useHistory } from 'react-router-dom';

function ButtonHome(props) {
  const history = useHistory();
  const handleClick = () => {
    history.push('/');
  };
  return (
    <button
      type="button"
      data-testid="btn-go-home"
      onClick={ handleClick }
      { ...props }
      className="button-base"
    >
      Home
    </button>
  );
}

export default ButtonHome;
