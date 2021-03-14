import { getToken, getQuestions } from '../services/questionsAPI';

import {
  DATES_USER,
  TOKEN_USER,
  QUESTIONS,
  SCORE,
  ASSERTIONS,
} from './index';

export function actionLoadedQuestions(token) {
  return async (dispatch) => {
    const QuestionsData = await getQuestions(token);
    dispatch({ type: QUESTIONS, result: QuestionsData.results });
  };
}

export function actionTokenPlayer() {
  return async (dispatch) => {
    const { token } = await getToken();
    localStorage.setItem('token', token);
    dispatch({ type: TOKEN_USER, token: localStorage.getItem('token') });
    dispatch(actionLoadedQuestions(token));
  };
}

export function actionDatesPlayer(name, email, score, assertions) {
  console.log(assertions);
  return {
    type: DATES_USER,
    name,
    email,
    score,
    assertions,
  };
}

export function actionNewScore(score) {
  return {
    type: SCORE,
    score,
  };
}

export const actionNewAssertion = (assertions) => ({
  type: ASSERTIONS,
  assertions,
});
