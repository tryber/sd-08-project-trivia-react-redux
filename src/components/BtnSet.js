import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../styles/components/BtnSet.module.css';

class BtnSet extends React.Component {
  render() {
    return (
      <div className={ styles.buttonSetContainer }>
        <Link to="/Set">
          <button
            className={ styles.buttonSetButton }
            data-testid="btn-settings"
            type="button"
          >
            Configurações
          </button>
        </Link>
      </div>
    );
  }
}

export default BtnSet;
