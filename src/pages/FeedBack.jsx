import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import FeedbackMsg from '../components/FeedbackMsg';
import HeaderFeedBack from '../components/HeaderFeedBack';

class FeedBack extends React.Component {
// constructor(){
// super()

  // }
  render() {
    return (
      <div>
        <div>
          <HeaderFeedBack />
        </div>
        <FeedbackMsg />
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => {
            const { history } = this.props;
            history.push('/');
          } }
        >
          Jogar Novamente
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => {
            const { history } = this.props;
            history.push('/ranking');
          } }
        >
          Ver Ranking
        </button>
        ;
      </div>
    );
  }
}

FeedBack.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(FeedBack);
