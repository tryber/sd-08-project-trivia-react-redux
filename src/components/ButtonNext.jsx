import React from 'react';

function ButtonNext(props) {
  return (
    <button
      type="button"
      data-testid="btn-next"
      { ...props }
      className="button-base"
    >
      Proxima!
    </button>
  );
}

export default ButtonNext;
