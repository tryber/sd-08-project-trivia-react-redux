import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { playerNomeAction, playerEmailAction, apiRequestFetch } from '../Redux/actions';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shouldRedirect: false,
      config: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleConfig = this.handleConfig.bind(this);
  }

  handleClick() {
    this.setState({ shouldRedirect: true });
  }

  handleConfig() {
    this.setState({ config: true });
  }

  render() {
    const { email, nome, playerNome, playerEmail, tokenData } = this.props;
    const { shouldRedirect, config } = this.state;

    const inputNameValid = nome.length > 0;
    const inputEmailValid = email.length > 0;
    const isValid = inputNameValid && inputEmailValid;

    if (shouldRedirect) return <Redirect to="/teste" />;
    if (config) return <Redirect to="/config" />;

    return (
      <form>
        <input
          data-testid="input-player-name"
          type="text"
          onChange={ (value) => playerNome(value) }
        />
        <input
          data-testid="input-gravatar-email"
          type="email"
          onChange={ (value) => playerEmail(value) }
        />
        <button
          data-testid="btn-play"
          disabled={ !isValid }
          type="button"
          onClick={ () => {
            this.handleClick();
            tokenData();
          } }
        >
          Jogar
        </button>
        <button
          type="button"
          data-testid="btn-settings"
          onClick={ () => {
            this.handleConfig();
          } }
        >
          Configurações
        </button>
      </form>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  nome: player.nome,
  email: player.email,
});

const mapDispatchToProps = (dispatch) => ({
  playerNome: (value) => dispatch(playerNomeAction(value)),
  playerEmail: (value) => dispatch(playerEmailAction(value)),
  tokenData: () => dispatch(apiRequestFetch()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

LoginForm.propTypes = {
  email: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
  playerNome: PropTypes.func.isRequired,
  playerEmail: PropTypes.func.isRequired,
  tokenData: PropTypes.func.isRequired,
};
