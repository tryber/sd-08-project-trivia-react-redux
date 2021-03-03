import React from 'react';
import Header from './Header';
import CardQuestion from './CardQuestion';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      loading: true,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((response) => response.json())
      .then((data) => this.setState({ questions: data, loading: false }));
  }

  render() {
    const { questions, loading } = this.state;
    console.log(questions.results);
    return (
      <div>
        <Header />
        <div>GAME</div>
        {loading ? <p>Loading...</p> : <CardQuestion questions={ questions.results } /> }
      </div>
    );
  }
}

export default Game;
