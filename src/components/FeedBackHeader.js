import React from 'react';
import './Feedback.css';
import { getSpecificObjValue } from '../helpers';

class FeedBackHeader extends React.Component {
  constructor() {
    super();
    const name = getSpecificObjValue('state', 'player', 'name');
    const score = getSpecificObjValue('state', 'player', 'score');
    this.state = {
      playerName: name,
      totalScore: score,
    };

    this.renderPlayerInfo = this.renderPlayerInfo.bind(this);
  }

  renderPlayerInfo() {
    const { playerName, playerImg, totalScore } = this.state;
    const playerImgRender = (<img
      data-testid="header-profile-picture"
      src={ playerImg }
      alt="player-avatar"
    />);
    const playerNameRender = (
      <p>
        Jogador:
        {' '}
        <span data-testid="header-player-name">{playerName}</span>
      </p>);
    const scoreRender = (
      <p>
        Pontos:
        {' '}
        <span data-testid="header-score">{totalScore.toString()}</span>
      </p>);
    return (
      <div className="header-info">
        {playerImgRender}
        {playerNameRender}
        {scoreRender}
      </div>);
  }

  render() {
    return (
      <div>
        {this.renderPlayerInfo()}
      </div>);
  }
}

export default FeedBackHeader;
