import React, { Component } from 'react';
import { IoSettingsSharp } from 'react-icons/io5';

import FixedButton from './FixedButton';

class SettingsButton extends Component {
  render() {
    return (
      <FixedButton
        data-testid="btn-settings"
        to="/settings"
        icon={ IoSettingsSharp }
      />
    );
  }
}

export default SettingsButton;
