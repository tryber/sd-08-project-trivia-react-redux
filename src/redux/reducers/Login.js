// import { LOGIN, GET_QUESTIONS, GET_QUESTIONS_TOKEN } from '../actions';

// const INITIAL_STATE = {
//   player: {},
//   token: '',
//   shouldRedirect: false,
//   questions: [],
// };

// export default function loginReducer(state = INITIAL_STATE, action) {
//   switch (action.type) {
//   case LOGIN:
//     localStorage.setItem('state', JSON.stringify(action.payload.player));
//     localStorage.setItem('token', action.payload.token);
//     console.log('login: ', action.payload);
//     return {
//       ...state,
//       player: action.payload.player,
//       token: action.payload.token,
//       shouldRedirect: true,
//     };
//   case GET_QUESTIONS:
//     console.log('get questions: ', action.payload);
//     return {
//       ...state,
//       questions: action.payload.questions,
//     };
//   case GET_QUESTIONS_TOKEN:
//     return {
//       ...state,
//       questions: action.payload.questions,
//       token: action.payload.token,
//     };
//   default:
//     return state;
//   }
// }

import { FIRST_LOGIN } from '../actions';

const INITIAL_STATE = {
  player: {},
  questions: [],
  shouldRedirect: false,
};

export default function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FIRST_LOGIN:
    return {
      // ...state, Não precisa dessa linha
      player: action.state,
      questions: action.questions.results,
      shouldRedirect: true,
    };
  default:
    return state;
  }
}
