import getquestions from '../Service/getQuetions';

export const PLAYER = 'PLAYER';
export const QUESTIONS = 'QUESTIONS';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const REQUEST_QUESTIONS_ERROR = 'REQUEST_QUESTIONS_ERROR';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const COUNTDOWN = 'COUNTDOWN';
export const CLEAR_COUNT = 'CLEAR_COUNT';

export const playerLogin = (name = '', assertions = 0,
  score = 0, gravatarEmail = '') => ({
  type: PLAYER,
  payload: {
    name,
    assertions,
    score,
    gravatarEmail,
  },
});

export const questionsTrivia = (questions) => ({
  type: QUESTIONS,
  payload: { questions },
});

export const requestQuestions = () => ({
  type: REQUEST_QUESTIONS,
  payload: {
    isFetching: true,
  },
});

export const requestQuestionsError = (error) => ({
  type: REQUEST_QUESTIONS_ERROR,
  payload: { error, isFetching: false },
});

export const timerCount = (ops) => ({
  type: COUNTDOWN,
  decrement: ops,
});

export const stopCount = (bool) => ({
  type: CLEAR_COUNT,
  clearcount: bool,
});

export const fetGetQuestions = (NUMBER_OF_QUESTIONS, userToken) => async (dispatch) => {
  dispatch(requestQuestions());
  try {
    const getQuestionsResponse = await getquestions(NUMBER_OF_QUESTIONS, userToken);
    dispatch(
      questionsTrivia(getQuestionsResponse),

    );
  } catch (error) {
    dispatch(
      requestQuestionsError(),
    );
  }
};
