import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../component/Header';
import Questions from '../component/Questions';
import { fetchQuestions } from '../actions';

class Game extends React.Component {
  componentDidMount() {
    const { fetchQuestionsAction } = this.props;
    fetchQuestionsAction();
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <Header />
        <Questions history={ history } />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchQuestionsAction: () => dispatch(fetchQuestions()),
});

Game.propTypes = {
  fetchQuestionsAction: PropTypes.func.isRequired,
  history: PropTypes.instanceOf(Object).isRequired,
};

export default connect(null, mapDispatchToProps)(Game);
