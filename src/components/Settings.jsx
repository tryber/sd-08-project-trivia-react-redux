import React from 'react';
import PropTypes from 'prop-types';

class Settings extends React.Component {
  render() {
    const { openSettings } = this.props;
    return (
      <div>
        <h1 data-testid="settings-title">Configurações</h1>
        <button type="button" onClick={ openSettings }>X</button>
      </div>
    );
  }
}

Settings.propTypes = {
  openSettings: PropTypes.func.isRequired,
};

export default Settings;
