import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Loading from '../Loading';
import fetchQuiz from '../../redux/actions/quiz';
import CardGame from '../CardGame';

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
    const { quiz, score, name, email } = this.props;
    if (loading) return <Loading />;
    const MAX = 4;
    if (count > MAX) return <Redirect to="/feedback" />;

    return (
      <div>
        <CardGame
          element={ quiz[count] }
          score={ score }
          changeCount={ this.changeCount }
          name={ name }
          email={ email }
          key={ count }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  quiz: state.quiz.quiz,
  token: state.user.token,
  name: state.user.name,
  email: state.user.email,
  score: state.scoreboard.score,
});

const mapDispatchToProps = (dispatch) => ({
  getQuiz: (token) => dispatch(fetchQuiz(token)),
});

Quiz.propTypes = {
  getQuiz: PropTypes.func.isRequired,
  quiz: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
