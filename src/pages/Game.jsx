import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Question from '../components/Question';
import Header from '../components/Header';
import { thunk } from '../redux/action';

class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    const { requestApi, difficulty } = this.props;
    requestApi(difficulty).then(() => this.setState({ loading: false }));
  }

  render() {
    const { loading } = this.state;

    return (
      <div>
        <Header />
        {loading ? <h1>...Loading</h1> : <Question />}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  requestApi: (difficulty) => dispatch(thunk(difficulty)),
});

const mapStateToProps = (state) => ({
  difficulty: state.reducerRequestApiTrivia.difficulty,
});

Game.propTypes = {
  requestApi: PropTypes.func.isRequired,
  difficulty: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
