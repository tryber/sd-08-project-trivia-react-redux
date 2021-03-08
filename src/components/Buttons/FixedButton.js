import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from '../../styles/components/Buttons/FixedButton.module.css';

class FixedButton extends Component {
  render() {
    const { icon: Icon, ...props } = this.props;
    return (
      <Link
        { ...props }
        className={ styles.fixedButton }
      >
        <Icon className={ styles.fixedButtonIcon } />
      </Link>
    );
  }
}

FixedButton.propTypes = {
  icon: PropTypes.elementType.isRequired,
};

export default FixedButton;
