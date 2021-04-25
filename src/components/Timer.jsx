import React from 'react';

class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 10,
    };
    this.timer = this.timer.bind(this);
  }

  timer() {
    const oneSecond = 1000;
    const { time } = this.state;
    if (time !== 0) {
      setTimeout(() => this.setState({
        time: time - 1,
      }), oneSecond);
    } else {
      clearTimeout();
    }
  }

  render() {
    this.timer();
    const { time } = this.state;
    return (
      <div>{ time }</div>
    );
  }
}

export default Timer;
