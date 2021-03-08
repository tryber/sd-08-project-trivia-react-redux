import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header';

class Feedback extends React.Component {
  constructor(props) {
    super(props);

    this.loadAssertions = this.loadAssertions.bind(this);
    this.renderMessage = this.renderMessage.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  loadAssertions() {
    const stateString = localStorage.getItem('state');
    console.log(stateString);
    const stateObject = JSON.parse(stateString);
    console.log(stateObject);
    const { player: { assertions, score } } = stateObject;
    console.log(assertions);
    return { assertions, score };
  }

  handleClick() {
    const { history } = this.props;
    history.push('/');
  }

  renderMessage() {
    const THREE = 3;
    if (this.loadAssertions().assertions < THREE) {
      return 'Podia ser melhor...';
    }
    return 'Mandou bem!';
  }

  render() {
    this.loadAssertions();
    return (
      <div>
        <Header />
        <div data-testid="feedback-text">
          {this.renderMessage()}
        </div>
        <div>
          Placar final:
        </div>
        <div data-testid="feedback-total-score">
          {this.loadAssertions().score}
        </div>
        <div>
          Respostas certas:
        </div>
        <div data-testid="feedback-total-question">
          {this.loadAssertions().assertions}
        </div>
        <button
          type="button"
          onClick={ this.handleClick }
          data-testid="btn-play-again"
        >
          Jogar novamente
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Feedback;
