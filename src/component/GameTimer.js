import React from 'react';
import PropTypes from 'prop-types';

class GameTimer extends React.Component {
  render() {
    const { timer } = this.props;
    return (
      <div>
        <p>
          Tempo restante:
          {timer}
        </p>
      </div>
    );
  }
}

GameTimer.propTypes = {
  timer: PropTypes.number.isRequired,
};

export default GameTimer;
