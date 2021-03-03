import React from 'react'

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      imagePatch: '',
      playerName: '',
      score: '',
    };
  }

  render() {
    const { playerName, score, imagePatch } = this.state
    return (
      <header>
        <img src={imagePatch} />
        <div>{playerName}</div>
        <div>{score}</div>
      </header>
    )
  }
}
