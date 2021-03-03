import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      urlImg: '',
    }
  }

  componentDidMount() {
    const { emailUser } = this.props;
    md5(emailUser).toString();
    this.setState(
      { 
        urlImg: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50',
      }
    );
  }

  render() {
    const { nameUser } = this.props;
    const { urlImg } = this.state;
    return (
      <header
        className="d-flex flex-md-row align-items-center p-2 px-md-4 border-bottom shadow-sm"
      >
        <div className="my-0 mr-md-auto font-weight-normal">
          <img
            className="rounded-circle"
            data-testid="header-profile-picture"
            src={ urlImg }
            alt="Gravatar"
          />
          <span
            className="ml-3"
            data-testid="header-player-name"
          >
            Jogador: { nameUser }
          </span>
        </div>
        <span data-testid="header-score">Pontos: 0</span>
      </header>
    );
  }
}

Header.propTypes = {
  nameUser: PropTypes.func.isRequired,
  emailUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  nameUser: state.user.nameUser,
  emailUser: state.user.emailUser,
});

export default connect(mapStateToProps)(Header);
