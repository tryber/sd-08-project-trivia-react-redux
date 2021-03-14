import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NextButton extends Component {
  render() {
    const { onClick } = this.props;
    return (
      <button
        type="button"
        data-testid="btn-next"
        onClick={ onClick }
      >
        Próxima
      </button>
    );
  }
}

NextButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default NextButton;
