import React from 'react';
import { Link } from 'react-router-dom';

class ButtonNext extends React.Component {
  render() {
    return (
      <button data-testid="btn-next" type="button">
        <Link to="/">Próxima</Link>
      </button>
    );
  }
}

export default ButtonNext;
