import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { email, name, scoreState } = this.props;
    md5(email).toString();
    return (
      <header className="HeaderContent">
        <div>
          <img
            src={ `https://www.gravatar.com/avatar/${md5(email.toString())}` }
            alt={ `Imagem de perfil do jogador: ${name}` }
            data-testid="header-profile-picture"
          />
          <p data-testid="header-player-name">{`Jogador: ${name}`}</p>
        </div>
        <p data-testid="header-score">{`Score: ${scoreState}`}</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.login.email,
  name: state.login.name,
  scoreState: state.scoreP.score,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  scoreState: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
