import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import Questions from '../components/Questions';

class Jogo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fotoJogador: '',
    };

    this.verificaEmail = this.verificaEmail.bind(this);
  }

  componentDidMount() {
    this.verificaEmail();
  }

  verificaEmail() {
    const { email } = this.props;
    const emailPasso1 = md5(email);
    const converteEmail = emailPasso1.toString();
    const request = `https://www.gravatar.com/avatar/${converteEmail}`;

    this.setState({
      fotoJogador: request,
    });
  }

  render() {
    const { nome, score } = this.props;
    const { fotoJogador } = this.state;
    return (
      <>
        <header>
          <img
            src={ fotoJogador }
            alt="imagem perfil jogador"
            data-testid="header-profile-picture"
          />
          <h3 data-testid="header-player-name">{ nome }</h3>
          <div data-testid="header-score">{score}</div>
        </header>
        <Questions />
      </>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  nome: player.name,
  email: player.gravatarEmail,
  score: player.score,
});

export default connect(mapStateToProps)(Jogo);

Jogo.propTypes = {
  email: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};
