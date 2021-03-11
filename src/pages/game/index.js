import React, { Component } from 'react';
import Header from '../../components/Header';
import Quiz from '../../components/Quiz';
import './styles.css';

export default class index extends Component {
  render() {
    return (
      <div className="card-game">
        <Header />
        <Quiz />
      </div>
    );
  }
}
