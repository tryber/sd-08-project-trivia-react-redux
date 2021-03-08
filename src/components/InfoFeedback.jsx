import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InfoFeedback extends Component {
  render() {
    const { score, assertions } = this.props;
    return (
      <div className="containerInfoFeedback">
        Placar final:
        <span data-testid="feedback-total-score">{ score }</span>
        <br />
        Número de perguntas acertadas:
        <span data-testid="feedback-total-question">{ assertions }</span>
      </div>
    );
  }
}

InfoFeedback.propTypes = {
  score: PropTypes.number.isRequired,
  assertions: PropTypes.number.isRequired,
};

export default InfoFeedback;
