import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { timerAction } from '../Actions';

class Ranking extends React.Component {
  renderList(p, index) {
    const { name, score, picture } = p;
    return (
      <li className="rank-list">
        <img src={ picture } alt={ name } />
        <p data-testid={ `player-name-${index}` }>{ name }</p>
        <p data-testid={ `player-score-${index}` }>{ score }</p>
      </li>
    );
  }

  render() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const { ajusta, history } = this.props;
    console.log(ranking);
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => {
            const TIMER = 30;
            ajusta(TIMER);
            history.push('/');
          } }
        >
          Jogar Novamente
        </button>
        <ul>
          { ranking
            .sort((a, b) => b.score - a.score)
            .map((p, index) => this.renderList(p, index)) }
        </ul>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  ajusta: (time) => dispatch(timerAction(time)),
});

Ranking.propTypes = {
  history: PropTypes.shape(PropTypes.any).isRequired,
  ajusta: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Ranking);
