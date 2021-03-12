import { RECEIVE_API } from '../actions/trivia';

const initialState = {
  allQuestions: [],
  loading: true,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case RECEIVE_API:
    return ({
      ...state,
      allQuestions: action.payload.json,
      loading: false,
    });
  default: return state;
  }
};

export default reducer;
