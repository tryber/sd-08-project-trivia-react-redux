import React from 'react';
import { Link } from 'react-router-dom';

class BtnSet extends React.Component {
  render() {
    return (
      <div>
        <Link to="/Set">
          <button data-testid="btn-settings" type="button">
            Configurações
          </button>
        </Link>
      </div>
    );
  }
}

export default BtnSet;
