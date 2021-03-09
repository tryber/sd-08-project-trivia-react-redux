const INITIAL_STATE = {
  results: [{
    category: '',
    question: '',
    correct_answer: '',
    incorrect_answers: [],
  }],
  shufledAnswers: [],
  questionNumber: 0,
};

export const ADD_LOGIN = 'ADD_LOGIN';
export const UPDATE_SCORE = 'UPDATE_SCORE';
export const UPDATE_SCORE_2 = 'UPDATE_SCORE_2';
export const LAST_QUESTION = 'LAST_QUESTION';
export const REQUEST_TOKEN = 'REQUEST_TOKEN';
export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const ZERO_POINT_FIVE = 0.5;
export const nextQuestion = 'nextQuestion';
export const PLAYER_IS_PLAYING = 'PLAYER_IS_PLAYING';
export const ADD_IMG = 'ADD_IMG';
export const RESET_STORE = 'RESET_STORE';
const THREE = 3;

export const onSubmit = (data) => ({
  type: ADD_LOGIN,
  payload: data,
});

export const scoreGlobal = (score) => ({
  type: UPDATE_SCORE,
  payload: {
    score,
  },
});

export const scoreGlobal2 = (score) => ({
  type: UPDATE_SCORE_2,
  payload: {
    score,
  },
});

export const tokenRequisition = ({ token }) => ({
  type: REQUEST_TOKEN,
  payload: token,
});

export const fetchToken = () => async (dispatch) => {
  const tokenResponse = await (await fetch('https://opentdb.com/api_token.php?command=request')).json();
  dispatch(tokenRequisition(tokenResponse));
  localStorage.setItem('token', tokenResponse.token);
};

export const questionsRequisition = ({ results = INITIAL_STATE }, unordered) => ({
  type: REQUEST_QUESTIONS,
  payload: results,
  unordered,
});

export const fetchQuestions = (token) => async (dispatch) => {
  const questionsResponse = await (await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)).json();
  const { results } = questionsResponse;
  const shuffledArray = results.map((element) => {
    const answer = [element.correct_answer, ...element.incorrect_answers];
    return answer.sort(() => ZERO_POINT_FIVE - Math.random());
  });
  if (questionsResponse.response_code === THREE) {
    dispatch(questionsRequisition(INITIAL_STATE, INITIAL_STATE.shufledAnswers));
    return;
  }
  dispatch(questionsRequisition(questionsResponse, shuffledArray));
};

export const buttonChangeQuestion = (number) => ({
  type: nextQuestion,
  payload: number,
});
export const lastQuestion = () => ({
  type: LAST_QUESTION,
  payload: true,
});

export const willPlay = () => ({
  type: PLAYER_IS_PLAYING,
});

export const gravatarAction = (url) => ({
  type: ADD_IMG,
  payload: url,
});

export const resetStoreAction = () => ({
  type: RESET_STORE,
});
