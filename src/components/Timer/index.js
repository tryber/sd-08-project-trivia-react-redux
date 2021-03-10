import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { saveTime, unreset } from '../../actions';

class Timer extends Component {
  constructor(props) {
    super(props);
    this.temporizador = this.temporizador.bind(this);
  }

  temporizador() {
    const { handleDisable, tempoDeResposta } = this.props;
    const intervalo = 1000;
    const cronometro = setInterval(() => {
      const { questionResolved, timer } = this.props;
      if (timer > 0 && !questionResolved) {
        tempoDeResposta(timer);
      } else if (questionResolved || timer === 0) {
        clearInterval(cronometro);
        handleDisable();
      }
    }, intervalo);
  }

  render() {
    const { timer, reseted, pUnreset } = this.props;
    if (reseted) {
      this.temporizador();
      pUnreset();
    }
    return (
      <>
        <div>
          Tempoooooo
        </div>
        <div>
          {timer}
        </div>
      </>
    );
  }
}

Timer.propTypes = {
  pUnreset: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
  questionResolved: PropTypes.bool.isRequired,
  reseted: PropTypes.bool.isRequired,
  tempoDeResposta: PropTypes.func.isRequired,
  handleDisable: PropTypes.func.isRequired,
};

function mapStateToProps({ triviaGame }) {
  return {
    timer: triviaGame.timer,
    reseted: triviaGame.reseted,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    tempoDeResposta: (payload) => dispatch(saveTime(payload)),
    pUnreset: () => dispatch(unreset()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Timer);
