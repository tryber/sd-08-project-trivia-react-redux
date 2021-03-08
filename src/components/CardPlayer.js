import React from 'react';
import PropTypes from 'prop-types';

class CardPlayer extends React.Component {
  render() {
    const { el: item, index } = this.props;
    console.log(item);
    return (
      <div>
        <div>
          <span data-testid={ `player-name-${index}` }>{ item.name }</span>
        </div>
        <div>
          <span data-testid={ `player-score-${index}` }>{ item.score}</span>
        </div>
        <div>
          <img src={ item.picture } alt={ item.name } />
        </div>
      </div>
    );
  }
}

CardPlayer.propTypes = {
  el: PropTypes.shape({
    name: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    picture: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default CardPlayer;
