import React from 'react';
import PropTypes from 'prop-types';

class NextQuestionButton extends React.Component {
  render() {
    const { callback } = this.props;
    return (
      <button
        data-testid="btn-next"
        type="button"
        onClick={ callback }
      >
        Próxima
      </button>
    );
  }
}

NextQuestionButton.propTypes = {
  callback: PropTypes.func.isRequired,
};

export default NextQuestionButton;
