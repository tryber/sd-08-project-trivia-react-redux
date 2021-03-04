// Esse reducer será responsável por tratar todas as informações relacionadas as despesas
import INITIAL_STATE from './initialState';
import {
  FETCH_QUESTIONS,
} from '../actions';

// mecher a partir daqui
export default function wallet(state = INITIAL_STATE, action) {
  // const { expenses, total } = state;

  switch (action.type) {
  case FETCH_QUESTIONS:
    return {
      ...state,
    };
  default:
    return state;
  }
}
