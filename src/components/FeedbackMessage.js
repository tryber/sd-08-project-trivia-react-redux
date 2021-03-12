import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import md5 from 'crypto-js/md5';

class FeedbackMessage extends React.Component {
  componentDidMount() {
    this.createRanking();
  }

  createRanking() {
    const { player } = this.props;
    const rankingArray = JSON.parse(localStorage.getItem('ranking'));
    if (!rankingArray) {
      localStorage.setItem('ranking',
        JSON.stringify([{
          name: player.name,
          score: player.score,
          picture: `https://www.gravatar.com/avatar/${md5(player.gravatarEmail.toString())}` },
        ]));
    } else {
      rankingArray.push({
        name: player.name,
        score: player.score,
        picture: `https://www.gravatar.com/avatar/${md5(player.gravatarEmail.toString())}` });
      localStorage.setItem('ranking', JSON.stringify(rankingArray));
    }
  }

  message() {
    const { player } = this.props;
    const THREE = 3;
    return (
      player.assertions < THREE ? (
        <h2 data-testid="feedback-text">Podia ser melhor...</h2>
      ) : (
        <h2 data-testid="feedback-text">Mandou bem!</h2>
      )
    );
  }

  score() {
    const { player } = this.props;
    return (
      <>
        <h1 data-testid="feedback-total-question">
          {player.assertions}
        </h1>
        <h1 data-testid="feedback-total-score">
          {player.score}
        </h1>
      </>
    );
  }

  rankingButton() {
    return (
      <Link to="/ranking">
        <button
          data-testid="btn-ranking"
          type="button"
        >
          Ver Ranking
        </button>
      </Link>

    );
  }

  render() {
    return (
      <>
        { this.message() }
        <h3> Informações </h3>
        { this.score() }
        { this.rankingButton() }
      </>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  player,
});

FeedbackMessage.propTypes = {
  player: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps)(FeedbackMessage);
