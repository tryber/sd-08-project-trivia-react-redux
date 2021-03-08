import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MD5 } from 'crypto-js';
import TopInfobar from './TopInfobar';
import './css/Feedback.css';

class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };

    this.generateMessage = this.generateMessage.bind(this);
    this.playAgain = this.playAgain.bind(this);
  }

  componentDidMount() {
    const { email, playerName, score } = this.props;
    const emailHash = MD5(email).toString();
    const gravatarUrl = `https://www.gravatar.com/avatar/${emailHash}`;
    let ranking = JSON.parse(localStorage.getItem('ranking'));
    if (!ranking) ranking = [];
    ranking.push({
      name: playerName,
      score,
      picture: gravatarUrl,
    });
    localStorage.setItem('ranking', JSON.stringify(ranking));
  }

  playAgain() {
    this.setState({ redirect: true });
  }

  generateMessage(assertions) {
    const ASSERT_NUM = 3;
    if (assertions < ASSERT_NUM) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  render() {
    const { score } = this.props;
    const { history: { push } } = this.props;
    const { assertions } = JSON.parse(localStorage.getItem('state')).player;
    const { redirect } = this.state;
    if (redirect) return (<Redirect to="/" />);
    return (
      <>
        <TopInfobar />
        <section className="feedbackDiv">
          <h4>
            Total de acertos:
            {' '}
            <span data-testid="feedback-total-question">{assertions}</span>
          </h4>
          <h4>
            Total de Pontos:
            {' '}
            <span data-testid="feedback-total-score">{score}</span>
          </h4>
          <div data-testid="feedback-text">{ this.generateMessage(assertions) }</div>

          <button
            onClick={ this.playAgain }
            className="cool"
            data-testid="btn-play-again"
            type="button"
          >
            Jogar novamente
          </button>
          <button
            type="button"
            onClick={ () => push('/ranking') }
            data-testid="btn-ranking"
            className="cool"
          >
            Ranking
          </button>
        </section>
      </>
    );
  }
}
Feedback.propTypes = {
  email: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.login.email,
  playerName: state.login.playerName,
  score: state.update.score,
});
// const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, null)(Feedback);
