import React from 'react';
import { Link } from 'react-router-dom';

class ButtonSettings extends React.Component {
  render() {
    return (
      <button data-testid="btn-settings" type="button">
        <Link to="/Config">Settings</Link>
      </button>
    );
  }
}

export default ButtonSettings;
