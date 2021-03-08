import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { name, score } = this.props;
    return (
      <header>
        <img
          src=""
          alt="avatar"
          data-testid="header-profile-picture"
        />
        <div>
          <span data-testid="header-player-name">{ `Nome: ${name}` }</span>
        </div>
        <div>
          Pontos:
          <span data-testid="header-score">{ score }</span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.user.name,
  score: state.user.score,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
