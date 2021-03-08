import { getQuestions as getQuestionsFromApi } from '../../helpers/index';

const GET_QUESTIONS = 'GET_QUESTIONS';
const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
const FAILED_QUESTIONS = 'FAILED_QUESTIONS';

export function getQuestions(questions) {
  return ({
    type: GET_QUESTIONS,
    payload: questions,
  });
}

export function requestQuestions() {
  return ({
    type: REQUEST_QUESTIONS,
  });
}

export function failedQuestions(error) {
  return ({
    type: FAILED_QUESTIONS,
    payload: error,
  });
}

export function fetchQuestions(numberOfQuestions, token) {
  return (dispatch) => {
    dispatch(requestQuestions());
    return getQuestionsFromApi(numberOfQuestions, token)
      .then((questions) => dispatch(getQuestions(questions.results)))
      .catch((error) => dispatch(failedQuestions(error)));
  };
}
