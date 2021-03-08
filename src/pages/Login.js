import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchJogo } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      nome: '',
    };
  }

  render() {
    const { token } = this.props;
    console.log(token);
    const { email, nome } = this.state;
    return (
      <div className="Login">
        <form>
          <label htmlFor="input-nome">
            Nome
            <input
              data-testid="input-player-name"
              type="text"
              id="input-nome"
              value={ nome }
              onChange={ (e) => this.setState({ nome: e.target.value }) }
              placeholder="nome"
            />
          </label>
          <label htmlFor="input-pass">
            Email.
            <input
              data-testid="input-gravatar-email"
              value={ email }
              type="email"
              onChange={ (e) => this.setState({ email: e.target.value }) }
              placeholder="senha"
            />
          </label>
        </form>
        <div className="login">
          <Link to="/jogo">
            <button
              type="button"
              onClick={ () => this.props.token() }
              // disabled={! nome || !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i) }
            >
              Jogar
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  token: (value) => dispatch(fetchJogo(value)),
});

export default connect(null, mapDispatchToProps)(Login);
