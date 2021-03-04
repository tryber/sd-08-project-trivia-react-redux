import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './Header';
import CardQuestion from './CardQuestion';

class Game extends React.Component {
  constructor() {
    super();
    this.handleCLick = this.handleCLick.bind(this);
    this.state = {
      questionIndex: 0,
    };
  }

  handleCLick() {
    const questionsSize = 4;
    const { questionIndex } = this.state;
    if (questionIndex < questionsSize) {
      this.setState((previousState) => ({
        questionIndex: previousState.questionIndex + 1,
      }));
    }
  }

  render() {
    const { questionIndex } = this.state;
    const { questions } = this.props;
    return (
      <div>
        <Header />
        <div>GAME</div>
        <CardQuestion question={ questions[questionIndex] } />
        <button type="button" data-testid="btn-next" onClick={ this.handleCLick }>
          Próximo
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.login.questions,
});

Game.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Game);
