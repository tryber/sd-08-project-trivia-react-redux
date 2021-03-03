import React, { Component } from 'react'


export default class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: '',
    };
  }

  render() {
    return (
      <section>
        <h1>Quiz</h1>
        <section>
          <div>Pergunta</div>
          <div>Respostas</div>
        </section>
        <section>
          <button>Próxima</button>
          <div>Counter</div>
        </section>
      </section>
    )
  }
}
