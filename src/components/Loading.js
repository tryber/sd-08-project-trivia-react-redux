import React, { Component } from 'react';

import styles from '../styles/components/Loading.module.css';

class Loading extends Component {
  render() {
    return (
      <div className={ styles.loading }>
        <div className={ `${styles.circle} ${styles.circle1}` } />
        <div className={ `${styles.circle} ${styles.circle2}` } />
        <div className={ `${styles.circle} ${styles.circle3}` } />
        <div className={ `${styles.circle} ${styles.circle4}` } />
      </div>
    );
  }
}

export default Loading;
