import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

const Header = ({ email, name, score }) => {
  const hash = md5(email).toString();

  return (
    <header
      className="d-flex flex-md-row align-items-center
       p-2 px-md-4 border-bottom shadow-sm"
    >
      <div className="my-0 mr-md-auto font-weight-normal">
        <img
          alt="user-gravatar"
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hash}` }
          className="rounded-circle"
        />
        <h3
          data-testid="header-player-name"
          className="ml-3"
          style={ { display: 'inline' } }
        >
          { name }
        </h3>
      </div>
      <h4 data-testid="header-score">
        { score }
      </h4>
    </header>
  );
};

Header.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.emailUser,
  name: state.user.nameUser,
  score: state.play.score,
});

export default connect(mapStateToProps)(Header);
