import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QuestionViewer from '../components/QuestionViewer';
import { fetchQuestions } from '../store/actions/questions.actions';
import Header from '../components/Header';

class Game extends React.Component {
  componentDidMount() {
    const { getQuestions } = this.props;
    const token = localStorage.getItem('token');
    const numberOfQuestions = 5;
    getQuestions(numberOfQuestions, token);
  }

  render() {
    const { isFetching, token, questions } = this.props;
    return (
      <>
        <Header />
        {!isFetching && token && questions.length > 0 && <QuestionViewer />}
      </>
    );
  }
}

Game.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  token: PropTypes.string.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape([])).isRequired,
};

const mapStateToProps = (state) => ({
  isFetching: state.questions.isFetching,
  questions: state.questions.questions,
  token: state.player.token,
});

const mapDispatchToProps = (dispatch) => ({
  getQuestions: (numberOfQuestions, token) => dispatch(
    fetchQuestions(numberOfQuestions, token),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
