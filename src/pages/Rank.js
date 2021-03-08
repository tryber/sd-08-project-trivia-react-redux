import React from 'react';
import { Redirect } from 'react-router-dom';

class Rank extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginRedirect: false,
    };
  }

  render() {
    const { loginRedirect } = this.state;
    if (loginRedirect) return <Redirect to="/" />;
    return (
      <div>
        <button type="button" data-testid="btn-go-home">Voltar</button>
      </div>
    );
  }
}

export default Rank;
