import React, { Component } from 'react';
import { AiFillHome } from 'react-icons/ai';

import FixedButton from './FixedButton';

class HomeButton extends Component {
  render() {
    return (
      <FixedButton
        data-testid="btn-go-home"
        to="/"
        icon={ AiFillHome }
      />
    );
  }
}

export default HomeButton;
