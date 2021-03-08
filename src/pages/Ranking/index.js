import React from 'react';
import { Link } from 'react-router-dom';
import { getLocalStorageRanking } from '../../localStorage';
import CardPlayer from '../../components/CardPlayer';

class Ranking extends React.Component {
  constructor() {
    const ranking = getLocalStorageRanking();
    super();
    this.state = {
      listRanking: ranking,
    };
    this.ordenar = this.ordenar.bind(this);
  }

  componentDidMount() {
    this.ordenar();
  }

  ordenar() {
    const { listRanking } = this.state;
    const result = listRanking.map((el) => el)
      .sort((a, b) => b.score - a.score);
    this.setState({ listRanking: result });
  }

  render() {
    const { listRanking } = this.state;
    return (
      <>
        <h1 data-testid="ranking-title">Ranking</h1>
        { listRanking.map((el, index) => (
          <CardPlayer key={ index } { ...{ el, index } } />
        ))}
        <div>
          <Link to="/">
            <button data-testid="btn-go-home" type="button">HOME</button>
          </Link>
        </div>
      </>
    );
  }
}

export default Ranking;
