const initialState = {
  isFetching: false,
  questions: '',
  error: '',
};

const getQuestions = (state = initialState, action) => {
  switch (action.type) {
  case 'REQUEST_QUESTION':
    return ({
      ...state,
      isFetching: true,
    });
  case 'GET_QUESTIONS':
    return ({
      ...state,
      isFetching: false,
      questions: action.payload,
    });
  case 'FAILED':
    return ({
      ...state,
      isFetching: false,
      error: action.payload,
    });
  default: return state;
  }
};

export default getQuestions;
