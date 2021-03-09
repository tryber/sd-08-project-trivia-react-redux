import React from 'react';
import { ButtonGoRanking, FeedBackHeader, FeedBackMessage } from '../components';
import ButtonReturnToLogin from '../components/ButtonReturnToLogin';

export default class FeedBackPage extends React.Component {
  render() {
    return (
      <section>
        <FeedBackHeader />
        <FeedBackMessage />
        <ButtonGoRanking />
        <ButtonReturnToLogin testIdName="btn-play-again" />
      </section>);
  }
}
