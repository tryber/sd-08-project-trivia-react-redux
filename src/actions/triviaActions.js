import { getQuestions } from '../services/questionsAPI';

import {
  QUESTIONS,
  TOKEN_USER,
} from './index';

export function actionTokenUser(name, email) {
  return {
    type: TOKEN_USER,
    name,
    email,
  };
}

export function loadedQuestions(arrayQuestions) {
  return {
    type: QUESTIONS,
    result: arrayQuestions,
  };
}

export function actionLoadedQuestions(token) {
  return async (dispatch) => {
    const QuestionsData = await getQuestions(token);
    dispatch(loadedQuestions(QuestionsData.results));
  };
}
