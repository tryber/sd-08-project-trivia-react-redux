import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HomeButton from '../components/Buttons/HomeButton';
import RankingPlayerCard from '../components/RankingPlayerCard';

import styles from '../styles/pages/Ranking.module.css';

class Ranking extends Component {
  render() {
    const { list } = this.props;
    return (
      <div className={ styles.rankingContainer }>
        <HomeButton />
        <h1 className={ styles.title } data-testid="ranking-title">Ranking</h1>
        <div className={ styles.rankingListContainer }>
          <div className={ styles.rankingList }>
            { list
              .sort((rankA, rankB) => rankB.score - rankA.score)
              .map((player, index) => (
                <RankingPlayerCard key={ index } player={ player } index={ 1 } />
              )) }
          </div>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = ({ ranking }) => ({
  list: ranking.list,
});

export default connect(mapStateToProps)(Ranking);
