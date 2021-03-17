import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Ranking extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  renderPlayersRanking() {
    const { rankingState } = this.props;
    // nao sei pk 'scoreA + scoreB' nao funciona mas 'scoreA - scoreB' funciona ai é so preciso inverter c:
    const sortRankingSTate = rankingState.sort((
      { score: scoreA },
      { score: scoreB },
    ) => scoreA - scoreB).reverse();
    return sortRankingSTate.map(({ name, picture, score }, index) => (
      <div key={ index }>
        <img alt="gravatar" src={ picture } />
        {' '}
        <span data-testid={ `player-name-${index}` }>
          { name }
        </span>
        {' '}
        <span data-testid={ `player-score-${index}` }>
          { score }
        </span>
      </div>
    ));
  }

  render() {
    this.renderPlayersRanking();
    const { history } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title">RANKING</h1>
        {this.renderPlayersRanking()}
        <button
          type="button"
          data-testid="btn-go-home"
          onClick={ () => history.push('./') }
        >
          home
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  rankingState: state.ranking,
});

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  rankingState: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps)(Ranking);
