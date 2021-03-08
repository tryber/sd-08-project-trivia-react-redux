import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { getImageOfUser } from '../../actions/setUserAndEmail';

import '../../styles/Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.getGravatar = this.getGravatar.bind(this);
  }

  getGravatar() {
    const { email, getGravatarUrl } = this.props;
    const test = md5(email);
    const hash = `https://www.gravatar.com/avatar/${test.toString()}`;
    getGravatarUrl(hash);
    return hash;
  }

  render() {
    const { name, score } = this.props;
    return (
      <header className="header">
        <div className="user">
          <img
            data-testid="header-profile-picture"
            src={ this.getGravatar() }
            alt="avatar"
          />
          <span data-testid="header-player-name">{name}</span>
        </div>
        <div>
          score:
          <span data-testid="header-score">
            {Number(score)}
          </span>
        </div>
      </header>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getGravatarUrl: (value) => dispatch(getImageOfUser(value)),
});

const mapStateToProps = (state) => ({
  email: state.setUser.email,
  name: state.setUser.name,
  score: state.score.score,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  getGravatarUrl: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
