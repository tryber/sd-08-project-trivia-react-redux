import React, { Component } from 'react';
import '../../styles/Loading.css';

export default class Loading extends Component {
  render() {
    return (
      <div className="loading-body">
        <div className="square-container">
          <div className="square" />
          <div className="square" />
          <div className="square" />
          <div className="square" />
        </div>
      </div>
    );
  }
}
