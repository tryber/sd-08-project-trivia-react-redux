import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actionss from '../Actions/index';
import TelaFeedback from '../Components/TelaFeedback';
import CardMultipla from '../Components/CardMultipla';

class Jogo extends React.Component {
  componentDidMount() {
    const { reqPerguntas } = this.props;
    const token = localStorage.getItem('token');
    reqPerguntas(token);
  }

  render() {
    const { perguntas } = this.props;
    const array = perguntas[0];

    if (!array) return <p>Carregando...</p>;
    return (
      <div>
        <TelaFeedback />
        <CardMultipla history={ this.props } />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  perguntas: state.reqApiReducer.results,
});

const mapDispatchToProps = (dispatch) => ({
  reqPerguntas: (token) => dispatch(actionss(token)),
});

Jogo.propTypes = {
  reqPerguntas: PropTypes.func.isRequired,
  perguntas: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Jogo);
