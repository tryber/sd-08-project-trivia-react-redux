import React from 'react';
import getToken from '../../services/getToken';
import getQuestions from '../../servicues/getQuestions';

class Play extends React.Component {
  componentDidMount() {
    getToken().then((data) => getQuestions(5, data.token).then((data) => console.log(data)));
  }

  render() {
    return (
      <div>
        Aqui ficará o game
      </div>
    );
  }
}

export default Play;

// ./Actions

const requestQuestions = () => ({
  type: 'REQUEST_QUESTION',
});

const receiveQuestions = (objectQuestion) => ({
  type: 'RECEIVE_QUESTION',
  objectQuestion,
});


export function fetchQuestions() {
  return (dispatch) => {
    dispatch(requestQuestions());
    return getToken().then(({token}) => getQuestions(5, token).then((data) => dispatch(receiveQuestions(data)))
  };
}

// ./Reducer/Questions

const INITIAL_STATE = {
  data,
  isFetching: false
};

function Questions(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'REQUEST_QUESTION':
    return { ...state, isFetching: true };
  case 'RECEIVE_QUESTION':
    return { ...state, data: action.objectQuestion, isFetching: false };
  default:
    return state;
  }
}

export default Questions;



.reducer/index