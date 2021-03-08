import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  constructor() {
    super();
    this.feedback = this.feedback.bind(this);
    this.countCorrect = this.countCorrect.bind(this);
  }

  feedback() {
    const stringfy = localStorage.getItem('state');
    const parse = JSON.parse(stringfy);
    const { assertions } = parse.player;
    let phrase = '';
    const goodMedia = 3;
    if (assertions < goodMedia) {
      phrase = 'Podia ser melhor...';
    } else {
      phrase = 'Mandou bem!';
    }
    return (<h2 data-testid="feedback-text">{phrase}</h2>);
  }

  countCorrect() {
    const stringfy = localStorage.getItem('state');
    const parse = JSON.parse(stringfy);
    return (
      <div>
        1
        {' '}
        <h3 data-testid="feedback-total-question">
          {parse.player.assertions}
        </h3>
        <h3 data-testid="feedback-total-score">
          {parse.player.score}
        </h3>
      </div>);
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <Header />
        {this.feedback()}
        {this.countCorrect()}
        <button
          data-testid="btn-play-again"
          type="button"
          onClick={ () => history.push('/') }
        >
          Jogar novamente
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.string.isRequired,
};
export default Feedback;
