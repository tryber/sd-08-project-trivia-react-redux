import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';
import Header from '../components/Header';
import { reseter, userAssertion } from '../actions';

class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      state: {
        player: {
          name: '',
          assertions: 0,
          score: 0,
          gravatarEmail: '',
        },
      },

    };
  }

  componentDidMount() {
    this.rankiing();
    this.savePlayer();
  }

  savePlayer() {
    const { name, email, scoreState, scoreAssertions } = this.props;

    this.setState({
      state: {
        player: {
          name,
          assertions: scoreAssertions,
          score: scoreState,
          gravatarEmail: email,
        },
      },

    }, () => {
      const { state } = this.state;
      localStorage.setItem('state', JSON.stringify(state));
    });

    console.log(name);
  }

  rankiing() {
    const { name, scoreState, email } = this.props;
    const rankingArray = JSON.parse(localStorage.getItem('ranking'));
    if (!rankingArray) {
      localStorage.setItem('ranking',
        JSON.stringify([{
          name,
          score: scoreState,
          picture: `https://www.gravatar.com/avatar/${md5(email.toString())}` },
        ]));
    } else {
      rankingArray.push({
        name,
        score: scoreState,
        picture: `https://www.gravatar.com/avatar/${md5(email.toString())}` });
      localStorage.setItem('ranking', JSON.stringify(rankingArray));
    }
  }

  localeraser() {
    localStorage.removeItem('token');
    localStorage.removeItem('state');
  }

  functionsHandler() {
    const { reset } = this.props;
    reset();
    this.localeraser();
  }

  render() {
    const { scoreState, scoreAssertions } = this.props;

    const certo = 3;
    const mensagem = scoreAssertions
    >= certo ? 'Mandou bem!' : 'Podia ser melhor...';

    return (
      <>
        <Header />
        <main>
          <h2 data-testid="feedback-text">{mensagem}</h2>

          <h2 data-testid="feedback-total-score">
            Seu placar foi:
            {scoreState}
          </h2>

          <h2 data-testid="feedback-total-question">
            Você acertou:
            {scoreAssertions}
            perguntas.
          </h2>

          {/* <p data-testid="feedback-text">Mandou bem!</p>
          <p data-testid="feedback-text">Podia ser melhor ....</p> */}

          <Link to="/ranking">

            <button
              onClick={ () => this.functionsHandler() }
              type="button"
              data-testid="btn-ranking"
            >
              {' '}
              Ver o Ranking
            </button>
          </Link>
          <Link to="/">
            <button
              onClick={ () => this.functionsHandler() }
              type="button"
              data-testid="btn-play-again"
            >
              Jogar novamente
            </button>
          </Link>
        </main>

      </>
    );
  }
}

Feedback.propTypes = {
  scoreState: PropTypes.number.isRequired,
  scoreAssertions: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  reset: PropTypes.func.isRequired,

};

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(reseter()),
  AssertionFunc: (value) => dispatch(userAssertion(value)),
});

const mapStateToProps = (state) => ({
  email: state.login.email,
  name: state.login.name,
  scoreState: state.scoreP.score,
  scoreAssertions: state.assertionReducer.assertion,

});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
