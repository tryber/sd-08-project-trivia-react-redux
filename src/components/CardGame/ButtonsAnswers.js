import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ButtonsAnswers extends Component {
  render() {
    const { name,
      dataTestId,
      className,
      buttonsAnswersDisabledValidity,
      handleClickAnswers,
      answer,
    } = this.props;

    return (
      <button
        name={ name }
        type="button"
        data-testid={ dataTestId }
        className={ className }
        disabled={ buttonsAnswersDisabledValidity }
        onClick={ handleClickAnswers }
      >
        {answer}
      </button>
    );
  }
}

ButtonsAnswers.propTypes = {
  name: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  handleClickAnswers: PropTypes.func.isRequired,
  buttonsAnswersDisabledValidity: PropTypes.bool.isRequired,
  answer: PropTypes.string.isRequired,
};
