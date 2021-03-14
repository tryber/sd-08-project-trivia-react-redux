import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { reseter } from '../actions';

class Ranking extends React.Component {
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

  reseter() {
    const { reset } = this.props;
    reset();
  }

  localeraser() {
    localStorage.removeItem('token');
    localStorage.removeItem('state');
  }

  functionHandler() {
    const { reset } = this.props;
    reset();
    this.localeraser();
  }

  render() {
    const List = JSON.parse(localStorage.getItem('ranking'));
    const SortetList = List
      .sort((a, b) => b.score - a.score);

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <ul>
          {
            SortetList.map((element, index) => (
              <li key={ element.index }>
                <img src={ element.picture } alt="" />
                <h3 data-testid={ `player-name-${index}` }>{element.name}</h3>
                <span data-testid={ `player-score-${index}` }>{element.score}</span>
              </li>))
          }
        </ul>
        <Link to="/">
          <button
            onClick={ () => this.functionHandler() }
            type="button"
            data-testid="btn-go-home"
          >
            {' '}
            Voltar ao Inicio
          </button>
        </Link>
        <Link to="/">
          <button
            onClick={ () => this.functionHandler() }
            type="button"
            data-testid="btn-play-again"
          >
            Jogar novamente
          </button>
        </Link>
      </div>
    );
  }
}

Ranking.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  scoreState: PropTypes.number.isRequired,
  scoreAssertions: PropTypes.number.isRequired,
  reset: PropTypes.func.isRequired,

};

const mapDispatchToProps = (dispatch) => ({
  reset: () => dispatch(reseter()),
});

const mapStateToProps = (state) => ({
  email: state.login.email,
  name: state.login.name,
  scoreState: state.scoreP.score,
  scoreAssertions: state.assertionReducer.assertion,
});

export default connect(mapStateToProps, mapDispatchToProps)(Ranking);
