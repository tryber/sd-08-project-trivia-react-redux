import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class HeaderFeedback extends React.Component {
  render() {
    const { playerInfo, gameInfo } = this.props;
    return (
      <div className="header-feedback">
        <img
          src={ `https://www.gravatar.com/avatar/${playerInfo.hashEmail}` }
          alt="avatar"
          data-testid="header-profile-picture"
        />
        <p data-testid="header-player-name">{ playerInfo.name }</p>
        <p data-testid="header-score">{ gameInfo.score }</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  playerInfo: state.loginReducer,
  gameInfo: state.gameReducer,
});

HeaderFeedback.propTypes = {
  playerInfo: PropTypes.objectOf(PropTypes.any).isRequired,
  gameInfo: PropTypes.objectOf(PropTypes.any).isRequired,

};

export default connect(mapStateToProps)(HeaderFeedback);
