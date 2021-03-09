import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  resetGame as resetGameAction,
} from '../actions';
import '../styles/Ranking.css';

class Ranking extends React.Component {
  constructor() {
    super();

    this.state = {
      ranking: false,
    };
  }

  componentDidMount() {
    this.updateRanking();
  }

  updateRanking() {
    const currentPlayerRecord = JSON.parse(localStorage.getItem('state'));
    const currentRanking = JSON.parse(localStorage.getItem('ranking')) || [];

    currentRanking.push({
      name: currentPlayerRecord.player.name,
      score: currentPlayerRecord.player.score,
      picture: currentPlayerRecord.player.gravatarEmail });

    currentRanking.sort((a, b) => b.score - a.score);

    localStorage.setItem('ranking', JSON.stringify(currentRanking));

    this.setState({
      ranking: true,
    });
  }

  renderRecordList() {
    const { ranking } = this.state;
    if (ranking) {
      return (
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            { JSON.parse(localStorage.getItem('ranking'))
              .map((player, index) => (
                <tr key={ index }>
                  <td>
                    <div className="player-info-container">
                      <img
                        className="ranking-avatar"
                        src={ player.picture }
                        alt="Player Avatar"
                      />
                      <p data-testid={ `player-name-${index}` }>{ player.name }</p>
                    </div>
                  </td>
                  <td data-testid={ `player-score-${index}` }>
                    { player.score }
                  </td>
                </tr>))}
          </tbody>
        </table>
      );
    }
  }

  render() {
    const { history, resetGame } = this.props;

    return (
      <div className="ranking-page-container">
        <div className="ranking-container">
          <h2 data-testid="ranking-title">Ranking</h2>
          { this.renderRecordList() }
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ () => { resetGame(); history.push('/'); } }
          >
            Voltar ao Início
          </button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  resetGame: () => dispatch(resetGameAction()),
});

Ranking.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  resetGame: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Ranking);
