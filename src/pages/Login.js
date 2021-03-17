import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchToken as fetchTokenAction, savedUser, getPlayerRank } from '../actions';
import fetchApiToken from '../services/token';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      buttonAble: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // GAMBIARRA PRA PASSAR NO REQUISITO 17 COM A MINHA OPNIAO DE MELHOR APLICACAO
    const { getPlayerRankAction, rankingState } = this.props;
    const playersRanking = JSON.parse(localStorage.getItem('playersRanking'));
    if (playersRanking !== null) {
      playersRanking.forEach((playerRank) => {
        let check = false;
        rankingState.forEach((rank) => {
          if (rank.name === playerRank.name) {
            check = true;
          }
        });
        if (!check) {
          getPlayerRankAction(playerRank);
        }
      });
    }
  }

  buttonAble() {
    const { email, name } = this.state;
    const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const minOfCaracteres = 0;
    if (validEmail.test(email) && name.length > minOfCaracteres) {
      this.setState({
        buttonAble: true,
      });
    } else {
      this.setState({
        buttonAble: false,
      });
    }
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => { this.buttonAble(); });
  }

  // Criando a função do botão, chamando a API e guardando o token no LocalStorage
  async handleClick() {
    const { email, name } = this.state;
    const { history } = this.props;
    const tokenResponse = await fetchApiToken();
    // console.log(tokenResponse.token);
    localStorage.setItem('token', tokenResponse.token);
    localStorage.setItem('state', JSON.stringify({ player: {
      name,
      assertions: 0,
      score: 0,
      gravaterEmail: email,
    } }));
    history.push('/game');
  }

  render() {
    const { email, name, buttonAble } = this.state;
    const { savedUserData } = this.props;
    return (
      <div>
        <h1>JOGO TRIVIA</h1>
        <section className="login-inputs">
          <input
            type="text"
            name="name"
            value={ name }
            onChange={ this.handleChange }
            placeholder="name"
            data-testid="input-player-name"
          />
          <input
            type="text"
            name="email"
            value={ email }
            onChange={ this.handleChange }
            placeholder="email"
            data-testid="input-gravatar-email"
          />
        </section>
        <div>
          <button
            type="button"
            data-testid="btn-play"
            disabled={ !buttonAble }
            onClick={ () => {
              savedUserData({ email, name });
              this.handleClick();
            } }
          >
            Jogar
          </button>
          <Link
            to="/configuracoes"
            // onClick={ this.handleClick } // Fazendo a requisição da API do token pelo clique
            // onClick={ () => savedUserData({ name, email }) }
          >
            <button
              type="button"
              data-testid="btn-settings"
            >
              Configuração
            </button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  rankingState: state.ranking,
});

const mapDispatchToProps = (dispatch) => ({
  savedUserData: (user) => dispatch(savedUser(user)),
  fetchToken: () => dispatch(fetchTokenAction()),
  getPlayerRankAction: (playerRank) => dispatch(getPlayerRank(playerRank)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

Login.propTypes = {
  savedUserData: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
  getPlayerRankAction: PropTypes.func.isRequired,
  rankingState: PropTypes.instanceOf(Array).isRequired,
};
