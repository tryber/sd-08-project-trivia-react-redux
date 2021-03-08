import { CURRENT_COUTDOWN, STOP_COUTDOWN, RESTART_COUTDOWN } from '../consts';

const INITIAL_STATE = {
  time: 1, // Necessario ser qualquer valor > 0, para efeitos de comparação de perguntas que não foram respondidas a tempo.
  stop: false,
  initialTime: 30,
};

const coutdownReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENT_COUTDOWN:
    return {
      ...state,
      time: action.payload,
    };
  case STOP_COUTDOWN:
    return {
      ...state,
      stop: action.payload,
    };
  case RESTART_COUTDOWN:
    return {
      ...state,
      initialTime: 30,
      stop: false,
    };
  default:
    return state;
  }
};

export default coutdownReducer;
