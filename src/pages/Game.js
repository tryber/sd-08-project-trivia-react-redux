import React, { Component } from 'react';
import Header from '../components/Header';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      wrongAnswers: '',
    };
    // this.handleInput = this.handleInput.bind(this);
    this.getQuestionsAndAnswers = this.getQuestionsAndAnswers.bind(this);
    this.APIQuestions = this.APIQuestions.bind(this);
    // this.oneQuestion = this.oneQuestion.bind(this);
    this.renderizaQuestion = this.renderizaQuestion.bind(this);
  }

  componentDidMount() {
    this.getQuestionsAndAnswers();
  }

  async getQuestionsAndAnswers() {
    const json = await this.APIQuestions();
    console.log(json);
    const questions = [];
    for (let i = 0; i < json.length; i += 1) {
      questions.push(json[i].question);
    }
    const categories = [];
    for (let i = 0; i < json.length; i += 1) {
      categories.push(json[i].category);
    }
    const correctsAnswers = [];
    for (let i = 0; i < json.length; i += 1) {
      correctsAnswers.push(json[i].correct_answer);
    }
    const wrongAnswers = [];
    for (let i = 0; i < json.length; i += 1) {
      wrongAnswers.push(json[i].incorrect_answers);
    }
    this.setState({
      categories,
      questions,
      correctsAnswers,
      wrongAnswers });
  }

  async APIQuestions() {
    try {
      const tokeen = localStorage.getItem('token');
      const endpoint = `https://opentdb.com/api.php?amount=5&token=${tokeen}`;
      const response = await fetch(endpoint);
      const data = await response.json();
      return data.results;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
  // eslint-disable-next-line react/sort-comp
  // async oneQuestion() {
  //   const questions = await this.APIQuestions();
  //   const question = questions[0];
  //   const question1 = question.question;
  //   console.log(question1);
  //   return question1;
  // }

  // async oneAnswers() {
  //   const questions = await this.APIQuestions();
  //   const question = questions[0];
  //   const question1 = question.results;
  //   return question1;
  // }

  renderizaQuestion() {
    const { wrongAnswers } = this.state;
    if (wrongAnswers === '') {
      return (
        <div>
          <div data-testid="question-text">LOADING...</div>
          <div data-testid="correct-answer">LOADING...</div>
          <div data-testid="wrong-answer">LOADING...</div>
        </div>
      );
    }
    const { questions, correctsAnswers, categories } = this.state;
    const question1 = questions[0];
    const answer = correctsAnswers[0];
    const wrongs = wrongAnswers[0];
    const category = categories[0];
    return (
      <div>
        <h2 data-testid="question-category">
          {`Categoria: ${category}`}
        </h2>
        <h1 data-testid="question-text">{question1}</h1>
        <button type="submit" data-testid="correct-answer">{answer}</button>
        {wrongs && wrongs.map((item, index) => (
          <button
            type="submit"
            key={ index }
            data-testid={ `wrong-answer-${index}` }
          >
            {item}
          </button>))}
      </div>
    );
  }

  render() {
    // this.oneQuestion()
    return (
      <div>
        <Header />
        {this.renderizaQuestion()}
      </div>
    );
  }
}

export default Game;
// https://opentdb.com/api.php?amount=5&token=${seu-token-aqui}

// 5. Crie a página de jogo que deve conter as informações relacionadas à pergunta
// PRIORIDADE 1 - Deve ser feita a requisição para a API para popular o jogo com as perguntas, categoria e alternativas

// Observações técnicas

// A pergunta e suas alternativas de resposta devem ser recebidas da API do Trivia
// A categoria da pergunta (campo category) deve ser exibida em um elemento com o atributo data-testid com o valor question-category para a pessoa que está jogando
// O texto da pergunta (campo question) deve ser exibido em um elemento com o atributo data-testid com o valor question-text para a pessoa que está jogando
// O texto com as alternativas devem ser exibidos seguindo as regras abaixo:
// O elemento com a alternativa correta deve possuir o atributo data-testid com o valor correct-answer
// Os elementos com as alternativas incorretas devem possuir o atributo data-testid com o valor wrong-answer-${index}, com ${index} iniciando com o valor 0
// As alternativas devem ser exibidas em ordem aleatória
// Dica: utilize botões (<button/>) para as alternativas
