import React from 'react';
import '../styles/Loading.css';

class Loading extends React.Component {
  render() {
    return (
      <div className="loading-container">
        <div className="spinner" />
      </div>
    );
  }
}

export default Loading;
