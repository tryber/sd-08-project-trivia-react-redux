import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import LocalStorage from '../components/LocalStorage';
import Header from '../components/Header';
import { fetchPerguntas } from '../actions';
import Perguntas from '../components/Perguntas';

class Jogo extends React.Component {
  constructor() {
    super();

    this.state = {
      token: '',

    };
  }

  async componentDidMount() {
    const { token } = this.state;
    const { perguntasERespostas } = this.props;
    const tokenUser = JSON.parse(localStorage.getItem('token'));
    this.setStateFunction(tokenUser);
    perguntasERespostas(token);
  }

  setStateFunction(tokenUser) {
    this.setState({ token: tokenUser });
  }

  render() {
    return (
      <div>
        <Header />
        <Perguntas />
        <LocalStorage />
        Jogo
      </div>
    );
  }
}

Jogo.propTypes = {
  perguntasERespostas: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  perguntasERespostas: ((value) => dispatch(fetchPerguntas(value))),
});

export default connect(null, mapDispatchToProps)(Jogo);
