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

  handleClick() {
    const { requestLogin } = this.props;
    const { name, email, score } = this.state;
    requestLogin(name, email, score);
  }

  render() {
    const { isDisabled } = this.state;
    const { shouldRedirect } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
          <p>NOSSA VEZ</p>
          {shouldRedirect ? (
            <Redirect to="/game" />
          ) : (
            <main>
              <form>
                <label htmlFor="name">
                  Name:
                  <input
                    type="text"
                    name="name"
                    placeholder="Digite seu nick"
                    data-testid="input-player-name"
                    onChange={ this.handleChange }
                  />
                </label>
                <br />
                <label htmlFor="email">
                  Email:
                  <input
                    type="email"
                    name="email"
                    placeholder="Digite seu email"
                    data-testid="input-gravatar-email"
                    onChange={ this.handleChange }
                  />
                  <br />
                  <button
                    type="button"
                    data-testid="btn-play"
                    disabled={ isDisabled }
                    onClick={ this.handleClick }
                  >
                    Jogar
                  </button>
                  <br />
                  <Link to="/settings">
                    <button
                      type="button"
                      data-testid="btn-settings"
                    >
                      Configurações
                    </button>
                  </Link>
                </label>
              </form>
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
};

const mapDispatchToProps = (dispatch) => ({
  requestLogin: (valeu) => dispatch(requestToken(valeu)),
});

const mapStateToProps = (state) => ({
  shouldRedirect: state.login.shouldRedirect,
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
