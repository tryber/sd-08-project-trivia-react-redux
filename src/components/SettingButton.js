import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SettingButton extends Component {
  render() {
    return (
      <Link to="/settings">
        <button
          data-testid="btn-settings"
          type="button"
        >
          Setting
        </button>
      </Link>
    );
  }
}
