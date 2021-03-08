import api, { https } from '../../services/apiGamer';
import localStorageToken, {
  deleteTheKeyLocalStorage,
} from '../../services/validatorLocalStorage';

export const INITIALIZE_GAME = 'INICIALIZE_GAME';
export const RESET_GAME = 'RESET_GAME';
export const GET_QUESTIONS = 'GET_QUESTIONS';
export const UPDATE_GAME_STATUS = 'UPDATE_GAME_STATUS';

const EXPIRED_TOKEN = 3;

const startTheGame = (payload) => ({
  type: INITIALIZE_GAME,
  payload,
});

const resetTheGame = () => ({
  type: RESET_GAME,
});

export function getStartTheGame({ nickname, email }) {
  return async (dispatch) => {
    const { token } = await api(https.token);
    const info = {
      player: {
        name: nickname,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(info));
    localStorageToken('token', token)
      .then((response) => dispatch(startTheGame({
        email,
        nickname,
        ...response,
      })));
  };
}

const getQuestions = (questions) => ({
  type: GET_QUESTIONS,
  questions,
});

export function fetchQuestions(numberOfQuestions, token, history) {
  return async (dispatch) => {
    const questions = await api(https.questions(numberOfQuestions, token));
    if (questions.response_code === EXPIRED_TOKEN) {
      deleteTheKeyLocalStorage('token');
      await dispatch(resetTheGame());
      history.push('/');
    } else {
      const arrayQuestions = Object.values(questions.results);
      dispatch(getQuestions(arrayQuestions));
    }
  };
}

export function updateGameSituation() {
  return {
    type: UPDATE_GAME_STATUS,
  };
}
