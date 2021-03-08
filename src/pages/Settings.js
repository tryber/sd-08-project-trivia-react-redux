import React from 'react';
import { Link } from 'react-router-dom';

class Settings extends React.Component {
  render() {
    return (
      <div className="settings-container">
        <h2 data-testid="settings-title">Configurações</h2>
        <label htmlFor="1">
          Tipo
          <input type="text" id="1" />
        </label>
        <label htmlFor="2">
          Categoria
          <input type="text" id="2" />
        </label>
        <label htmlFor="3">
          Dificuldade
          <input type="text" id="3" />
        </label>
        <Link to="/">
          Salvar
        </Link>
      </div>
    );
  }
}

export default Settings;
