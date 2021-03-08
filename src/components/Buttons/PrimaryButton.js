import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from '../../styles/components/Buttons/PrimaryButton.module.css';

class PrimaryButton extends Component {
  render() {
    const { children, ...props } = this.props;
    return (
      <button
        type="button"
        className={ styles.primaryButton }
        { ...props }
      >
        { children }
      </button>
    );
  }
}

PrimaryButton.propTypes = {
  children: PropTypes.string.isRequired,
};

export default PrimaryButton;
