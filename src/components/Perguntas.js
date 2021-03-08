import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import '../App.css';
import PropTypes from 'prop-types';

class Perguntas extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      shouldRedirect: false,
      right: '',
      wrong: '',
      hide: true,
    };
    this.hundleButton = this.hundleButton.bind(this);
  }

  getPerguntas(position) {
    const { perguntasState } = this.props;
    const { right, wrong } = this.state;
    if (perguntasState) {
      const alternativas = perguntasState.results[
        position
      ].incorrect_answers.map((e, index) => ({
        correct: false,
        text: e,
        datatestid: `wrong-answer-${index}`,
      }));
      alternativas.push({
        correct: true,
        text: perguntasState.results[position].correct_answer,
        datatestid: 'correct-answer',
      });
      const multiplicador = 0.5;
      const result = perguntasState !== undefined && (
        <div>
          <p data-testid="question-category">
            {perguntasState.results[position].category}
          </p>
          <p data-testid="question-text">
            {perguntasState.results[position].question}
          </p>
          {alternativas
            .sort(() => multiplicador - Math.random())
            .map((e) => (
              <div key={ e.pergunta }>
                <button
                  type="button"
                  className={ `null, ${e.correct === true ? right : wrong}` }
                  onClick={ () => this.answersHandler(e, alternativas) }
                >
                  {e.text}
                </button>
              </div>
            ))}
        </div>
      );
      return result;
    }
  }

  endOfthegame() {
    const { position } = this.state;
    const { perguntasState } = this.props;
    const alternativas = perguntasState.results[position].incorrect_answers.map(
      (e, index) => ({
        correct: false,
        text: e,
        datatestid: `wrong-answer-${index}`,
      }),
    );
    console.log(alternativas.length);
    alternativas.push({
      correct: true,
      text: perguntasState.results[position].correct_answer,
      datatestid: 'correct-answer',
    });
    if (alternativas.length > position) {
      this.setState({
        position: position + 1,
        right: '',
        wrong: '',
        hide: true,
      });
    } else {
      this.setState({
        shouldRedirect: true,
      });
    }
  }

  answersHandler(e) {
    if (e.correct === true) {
      this.setState({
        right: 'right-answer',
        wrong: 'wrong-answer',
        hide: false,
      });
    }
    this.setState({
      right: 'right-answer',
      wrong: 'wrong-answer',
      hide: false,
    });
  }

  hundleButton() {
    this.endOfthegame();
  }

  render() {
    const { position, shouldRedirect, hide } = this.state;
    if (shouldRedirect) {
      return <Redirect to="/feedback" />;
    }
    return (
      <div>
        {this.getPerguntas(position)}
        <button
          type="button"
          data-testid="btn-next"
          className={ `null, ${hide ? 'hidden' : 'null'}` }
          onClick={ () => this.hundleButton() }
        >
          Próximo
        </button>
      </div>
    );
  }
}

Perguntas.propTypes = {
  perguntasState: PropTypes.shape({
    results: PropTypes.func,
  }).isRequired,
};
const mapStateToProps = (state) => ({
  perguntasState: state.perguntaReducers.pergunta,
});
export default connect(mapStateToProps, null)(Perguntas);
