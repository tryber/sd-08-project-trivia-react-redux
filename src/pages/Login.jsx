import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import { requestToken } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      name: '',
      score: 0,
      assertions: 0,
      isDisabled: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.checkEmailAndName = this.checkEmailAndName.bind(this);
  }

  handleChange(event) {
    const {
      target: { name, value },
    } = event;
    this.setState(
      {
        [name]: value,
        isDisabled: true,
      },
      () => this.checkEmailAndName(),
    );
  }

  handleClick() {
    const { requestLogin, settings } = this.props;
    const { name, email, score, assertions } = this.state;
    requestLogin(name, email, score, assertions, settings);
  }

  checkEmailAndName() {
    const minimumNameSize = 1;
    const { email, name } = this.state;
    const re = /.+@[A-z]+[.]com/;
    const isValidEmail = re.test(email);
    const isValidName = name.length > minimumNameSize;
    if (isValidName && isValidEmail) {
      this.setState({
        isDisabled: false,
      });
    }
  }

  render() {
    const { isDisabled } = this.state;
    const { shouldRedirect } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          {shouldRedirect ? (
            <Redirect to="/game" />
          ) : (
            <main>
              <br />
              <form className="form-inline form-flex">
                <div className="form-group mb-2">
                  <label htmlFor="name">
                    Name:
                    <input
                      type="text"
                      name="name"
                      placeholder="Digite seu nick"
                      className="form-control"
                      data-testid="input-player-name"
                      onChange={ this.handleChange }
                    />
                  </label>
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="email">
                    Email:
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Digite seu email"
                      data-testid="input-gravatar-email"
                      onChange={ this.handleChange }
                    />
                    <br />
                    <button
                      type="button"
                      data-testid="btn-play"
                      className="btn btn-success"
                      disabled={ isDisabled }
                      onClick={ this.handleClick }
                    >
                      Jogar
                    </button>
                    <Link to="/settings">
                      <button
                        type="button"
                        data-testid="btn-settings"
                        className="btn btn-warning"
                      >
                        Configurações
                      </button>
                    </Link>
                  </label>
                </div>
              </form>
              <img src="https://cdn.discordapp.com/attachments/697509460314423447/818628525929267271/1615246638572.png" alt="" className="img-icaro" />
              <img src="https://cdn.discordapp.com/attachments/697509460314423447/818638613059338250/1615249031948.png" alt="" className="img-let" />
              <img src="https://cdn.discordapp.com/attachments/697509460314423447/818643562551443476/1615250226808.png" alt="" className="img-wolf" />
              <img src="https://cdn.discordapp.com/attachments/697509460314423447/818821602992455710/1615292465504.png" alt="" className="img-alberto" />
              <img src="https://cdn.discordapp.com/attachments/697509460314423447/818833691630501911/1615295548925.png" alt="" className="img-guilherme" />
            </main>
          )}
        </header>
      </div>
    );
  }
}

Login.propTypes = {
  requestLogin: PropTypes.func.isRequired,
  shouldRedirect: PropTypes.bool.isRequired,
  settings: PropTypes.shape({}).isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  requestLogin: (name, email, score, assertions, settings) => dispatch(
    requestToken(name, email, score, assertions, settings),
  ),
});

const mapStateToProps = (state) => ({
  shouldRedirect: state.login.shouldRedirect,
  settings: state.settings,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
