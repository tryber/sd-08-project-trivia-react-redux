import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  avatarFromEmail(mail) {
    const hash = md5(mail);
    const url = `https://www.gravatar.com/avatar/${hash}`;
    return url;
  }

  render() {
    const { score, name, email } = this.props;
    const avatar = this.avatarFromEmail(email);
    return (
      <div className="header" style={ { display: 'flex' } }>
        <h1>Tela Principal</h1>
        <img
          data-testid="header-profile-picture"
          src={ avatar }
          alt="avatar"
        />
        <h3 data-testid="header-player-name">
          Nome:
          {name}
        </h3>
        <h3>
          {'Placar: '}
          <span data-testid="header-score">{score}</span>
        </h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  name: state.reducerRequestApiTrivia.name,
  email: state.reducerRequestApiTrivia.email,
  score: state.reducerRequestApiTrivia.currentScore,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
