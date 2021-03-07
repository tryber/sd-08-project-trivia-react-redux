import React from 'react';

function ButtonNext(props) {
  return (
    <button
      type="button"
      { ...props }
      data-testid="btn-next"
    >
      Proxima!
    </button>
  );
}

export default ButtonNext;
