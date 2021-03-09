import React from 'react';
import { Link } from 'react-router-dom';

export default class ButtonConfig extends React.Component {
  render() {
    return (
      <div>
        <Link to="/configPage">
          <button type="button" data-testid="btn-settings">Configurações</button>
        </Link>
      </div>);
  }
}
