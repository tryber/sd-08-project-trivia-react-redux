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
      { ...props }
      data-testid="btn-go-home"
      onClick={ handleClick }
    >
      Home
    </button>
  );
}

export default ButtonHome;
