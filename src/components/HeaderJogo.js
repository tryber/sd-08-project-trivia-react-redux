import React from 'react';
import CryptoJS from 'crypto-js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from '../styles/components/HeaderJogo.module.css';

class HeaderJogo extends React.Component {
  createHash() {
    const { email } = this.props;
    const hash = CryptoJS.MD5(email);
    const result = hash.toString();
    return result;
  }

  render() {
    const hash = this.createHash();
    const { name, score } = this.props;
    return (
      <header className={ styles.headerJogoContainer }>
        <div className={ styles.headerJogoImg }>
          <img data-testid="header-profile-picture" src={ `https://www.gravatar.com/avatar/${hash}` } alt="teste" />
        </div>
        <div className={ styles.headerJogoName }>
          <span data-testid="header-player-name">{ `Jogador: ${name}` }</span>
        </div>
        <div className={ styles.headerJogoScore }>
          <span data-testid="header-score">{score}</span>
        </div>
      </header>
    );
  }
}

HeaderJogo.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = ({ user }) => ({
  email: user.email,
  name: user.name,
  score: user.score,
});

export default connect(mapStateToProps)(HeaderJogo);
