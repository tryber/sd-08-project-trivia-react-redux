import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js';
import PropTypes from 'prop-types';

class Header extends React.Component {
  constructor() {
    super();

    this.handleUpdateStateStorage = this.handleUpdateStateStorage.bind(this);
    this.handleUpdateRankingStorage = this.handleUpdateRankingStorage.bind(this);
  }

  componentDidUpdate() {
    this.handleUpdateStateStorage();
    this.handleUpdateRankingStorage();
  }

  getGravatarHash() {
    const { email } = this.props;

    return md5(email).toString();
  }

  handleUpdateStateStorage() {
    const { name, email, score, correctAnswers } = this.props;
    const currentState = JSON.parse(localStorage.getItem('state'));

    const newState = {
      ...currentState,
      player: {
        name,
        gravatarEmail: email,
        score,
        assertions: correctAnswers,
      },
    };

    localStorage.setItem('state', JSON.stringify(newState));
  }

  handleUpdateRankingStorage() {
    const { name, score, email } = this.props;

    let ranking = JSON.parse(localStorage.getItem('ranking'));

    const user = ranking.some((each, index) => {
      if (each.name === name) {
        ranking[index] = {
          name,
          score,
          picture: email,
        };
      }

      return each.name === name;
    });

    if (!user) {
      ranking = [
        ...ranking,
        { name, score, picture: email },
      ];
    }

    localStorage.setItem('ranking',
      JSON.stringify(ranking.sort((a, b) => b.score - a.score)));
  }

  render() {
    const { name, score } = this.props;

    return (
      <header>
        <img src={ `https://www.gravatar.com/avatar/${this.getGravatarHash}` } alt="Gravatar" data-testid="header-profile-picture" />

        <p data-testid="header-player-name">{name}</p>

        <span data-testid="header-score">{score}</span>
      </header>
    );
  }
}

const mapStateToProps = ({
  login: { name, email },
  score: { score, correctAnswers },
}) => ({
  name,
  email,
  score,
  correctAnswers,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  correctAnswers: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, null)(Header);
