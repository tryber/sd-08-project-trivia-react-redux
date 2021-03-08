import React from 'react';
import Header from '../../components/HeaderJogo';
import Jogo from '../../components/Jogo';
import styles from '../../styles/components/JogoContainer.module.css';

class Jogar extends React.Component {
  render() {
    return (
      <main className={ styles.jogo }>
        <Header />
        <Jogo />
      </main>
    );
  }
}

export default Jogar;
