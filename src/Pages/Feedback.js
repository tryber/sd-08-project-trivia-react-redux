import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';
import { timerAction } from '../Actions';

class FeedbackScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gravatarEmail: '',
      name: '',

    };

    this.setHashedEmail = this.setHashedEmail.bind(this);
    this.setRank = this.setRank.bind(this);
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

  setRank() {
    const getLocalStorage = JSON.parse(localStorage.getItem('state'));
    const { score, name } = getLocalStorage.player;
    const { gravatarEmail } = this.state;
    const arr = [];
    console.log(`Pontuação - ${score}`);
    arr.push({
      name,
      score,
      picture: `https://www.gravatar.com/avatar/${gravatarEmail}`,
    });

    let getRanking = JSON.parse(localStorage.getItem('ranking'));
    console.log(getRanking);
    getRanking = [...getRanking, ...arr];
    console.log(getRanking);
    localStorage.setItem('ranking', JSON.stringify(getRanking));
  }

  feedBack(total) {
    const MIN_CORRECT = 3;
    return total < MIN_CORRECT ? 'Podia ser melhor...' : 'Mandou bem!';
  }

  render() {
    const { total, totalQuestions, history, ajusta } = this.props;
    const { gravatarEmail, name } = this.state;
    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${gravatarEmail}` }
            alt="seila"
          />
          <h1 data-testid="header-player-name">{ name }</h1>
          <p data-testid="feedback-total-score">{ total }</p>
          <p data-testid="header-score">{ total }</p>
          <p data-testid="feedback-total-question">{ totalQuestions }</p>
        </header>
        <h1 data-testid="feedback-text">{ this.feedBack(totalQuestions) }</h1>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => {
            const TIMER = 30;
            ajusta(TIMER);
            history.push('/');
          } }
        >
          Jogar Novamente
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => {
            this.setRank();
            history.push('/ranking');
          } }
        >
          Ranking
        </button>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  total: state.perguntasReducer.acertos,
  totalQuestions: state.perguntasReducer.questions,
});

const mapDispatchToProps = (dispatch) => ({
  ajusta: (time) => dispatch(timerAction(time)),
});

FeedbackScreen.propTypes = {
  ajusta: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
  history: PropTypes.shape(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackScreen);
