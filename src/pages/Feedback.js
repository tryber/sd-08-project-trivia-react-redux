import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import FeedbackMessage from '../components/FeedbackMessage';

class Feedback extends React.Component {
  render() {
    return (
      <>
        <Header />
        <FeedbackMessage />
        <Link to="/">
          <button data-testid="btn-play-again" type="button">Jogar novamente</button>
        </Link>
      </>
    );
  }
}

export default Feedback;
