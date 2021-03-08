import { LOGIN, GET_TOKEN, SAVE, SAVE_QUESTIONS, UPDATE_SCORE } from './actions';

const initialLoginState = { email: '',
  playerName: '' };

export function loginReducer(state = initialLoginState, { type, payload }) {
  switch (type) {
  case LOGIN:
    return { ...state, ...payload };
  case GET_TOKEN:
    return { ...state, token: payload };
  default:
    return state;
  }
}

export function updateReducer(state = { score: 0 }, { type, payload }) {
  switch (type) {
  case UPDATE_SCORE:
    return { ...state, score: payload };
  default:
    return state;
  }
}

const initialConfigState = {
  category: '',
  difficulty: '',
  type: '',
  amount: 5,
};

export function configReducer(state = initialConfigState, { type, payload }) {
  switch (type) {
  case SAVE:
    return { ...state, ...payload };
  default:
    return state;
  }
}

export function questionsReducer(state = {}, { type, payload }) {
  switch (type) {
  case SAVE_QUESTIONS:
    return { ...state, ...payload };
  default:
    return state;
  }
}
