import React from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class TelaFeedback extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gravatarEmail: '',
      name: '',

    };

    this.setHashedEmail = this.setHashedEmail.bind(this);
  }

  componentDidMount() {
    const getLocalStorage = JSON.parse(localStorage.getItem('state'));
    const { gravatarEmail, name } = getLocalStorage.player;
    const convert = md5(gravatarEmail);
    this.setHashedEmail(convert, name);
  }

  setHashedEmail(gravatarEmail, name) {
    this.setState({
      gravatarEmail,
      name,
    });
  }

  render() {
    const { gravatarEmail, name } = this.state;
    const { total } = this.props;

    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${gravatarEmail}` }
          alt="seila"
        />
        <h1 data-testid="header-player-name">{name}</h1>
        <p data-testid="header-score">{total}</p>
      </header>
    );
  }
}
const mapStateToProps = (state) => ({
  total: state.perguntasReducer.acertos,
});

TelaFeedback.propTypes = {
  total: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(TelaFeedback);
