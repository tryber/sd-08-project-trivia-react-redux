import React from 'react';

export default class Ranking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      names: ['name1', 'name2', 'name3'],
    };
  }

  render() {
    const { names } = this.state;
    return (
      <section>
        <h3 data-testid="ranking-title">Ranking</h3>
        {names.map((name, index) => (
          <p key={ index }>{name}</p>
        ))}
      </section>
    );
  }
}
