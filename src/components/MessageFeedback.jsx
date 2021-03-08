import React from 'react';
import PropTypes from 'prop-types';

class MessageFeedback extends React.Component {
  constructor() {
    super();
    this.showMessage = this.showMessage.bind(this);
  }

  showMessage() {
    const { assertions } = this.props;
    let message = '';
    const num = 3;
    if (assertions < num) {
      message = 'Podia ser melhor...';
    } else if (assertions >= num) {
      message = 'Mandou bem!';
    }
    return message;
  }

  render() {
    return (
      <p data-testid="feedback-text">{ this.showMessage() }</p>
    );
  }
}

MessageFeedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default MessageFeedback;
