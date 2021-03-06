import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Loading from '../Loading';
import { fetchQuiz } from '../../redux/actions';
import CardGame from '../CardGame';
import './style.css';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      count: 0,
    };
    this.changeCount = this.changeCount.bind(this);
  }

  async componentDidMount() {
    const { getQuiz, token } = this.props;
    await getQuiz(token);
    this.handleChange();
  }

  changeCount(callback) {
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
    callback();
  }

  handleChange() {
    this.setState({
      loading: false,
    });
  }

  render() {
    const { loading, count } = this.state;
    const { quiz, score, rightAnswers } = this.props;
    if (loading) return <Loading />;
    const MAX = 4;
    if (count > MAX) return <Redirect to="/feedback" />;

    return (
      <div>
        <CardGame
          element={ quiz[count] }
          score={ score }
          rightAnswers={ rightAnswers }
          changeCount={ this.changeCount }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
  quiz: state.quiz.quiz,
  score: state.score.score,
  rightAnswers: state.score.rightAnswers,
});

const mapDispatchToProps = (dispatch) => ({
  getQuiz: (token) => dispatch(fetchQuiz(token)),
});

Quiz.propTypes = {
  getQuiz: PropTypes.func.isRequired,
  quiz: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  rightAnswers: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
