import { LOGIN, GET_TOKEN, SAVE, SAVE_QUESTIONS } from './actions';

export function loginReducer(state = {}, { type, payload }) {
  switch (type) {
  case LOGIN:
    return { ...state, ...payload };
  case GET_TOKEN:
    return { ...state, token: payload };
  default:
    return state;
  }
}

const initialConfigState = {
  category: '',
  difficulty: '',
  type: '',
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
