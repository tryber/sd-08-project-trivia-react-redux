import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DefaultButton extends Component {
  render() {
    const {
      reqAttributes,
      btnText,
      name,
      isSubmit = undefined,
      disabled = false,
    } = this.props;
    return (
      <button
        type={ isSubmit ? 'submit' : 'button' }
        data-testid={ reqAttributes }
        name={ name }
        disabled={ disabled }
      >
        {btnText}
      </button>
    );
  }
}

DefaultButton.propTypes = {
  reqAttributes: PropTypes.string.isRequired,
  btnText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isSubmit: PropTypes.string,
  disabled: PropTypes.bool,

};

DefaultButton.defaultProps = {
  disabled: false,
  isSubmit: undefined,
};

export default DefaultButton;
