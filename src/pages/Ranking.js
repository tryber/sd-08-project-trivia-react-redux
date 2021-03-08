import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
      player: {
        name: '',
        assertions: '',
        score: '',
        gravatarEmail: '',
      },

      ranking: {
        name: '',
        score: '',
        picture: '',
      },
    };
  }

  componentDidMount() {
    this.savePlayer();
    this.saveRanking();
  }

  savePlayer() {
    const { name, email } = this.props;
    const { player } = this.state;

    this.setState(
      {
        player: {
          name,
          assertions: '',
          score: '',
          gravatarEmail: email,
        },
      },
      () => {
        localStorage.setItem('player', JSON.stringify(player));
      },
    );

    console.log(name);
  }

  saveRanking() {
    const { name, email } = this.props;
    const { ranking } = this.state;

    this.setState(
      {
        ranking: {
          name,
          score: '',
          picture: email,
        },
      },
      () => {
        localStorage.setItem('ranking', JSON.stringify([ranking]));
      },
    );

    console.log(name);
  }

  render() {
    const { name, email } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          <li>
            <img
              src={ `https://www.gravatar.com/avatar/${email}` }
              alt={ `Imagem de perfil do jogador: ${name}` }
              data-testid="header-profile-picture"
            />
            {/* <p data-testid={ `player-name-${index}` }>
              {' '}
              {`Jogador: ${name}`}
            </p> */}
            {/* <p
              data-testid={ `player-score-${index}` }
            >
              {`Score: ${score.sort((a, b) => b - a).toString()}`}
            </p> */}
          </li>
        </ul>
        <Link to="/">
          <button type="button" data-testid="btn-go-home"> Voltar ao Inicio </button>
          <Link to="/">
            <button type="button" data-testid="btn-play-again">Jogar novamente </button>
          </Link>
        </Link>
      </div>
    );
  }
}

Ranking.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.login.email,
  name: state.login.name,

});
export default connect(mapStateToProps)(Ranking);
