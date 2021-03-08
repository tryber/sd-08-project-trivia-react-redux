import * as storage from '../../services/storage';

export const Types = {
  INIT_GAME: 'INIT_GAME',
  RIGHT_ANSWER: 'RIGHT_ANSWER',
  WRONG_ANSWER: 'WRONG_ANSWER',
  NEXT_QUESTION: 'NEXT_QUESTION',
  SAVE_QUESTIONS: 'SAVE_QUESTIONS',
  FETCH_QUESTIONS: 'FETCH_QUESTIONS',
};

const INITIAL_STATE = {
  questions: [],
  numberOfQuestions: 5,
  currentQuestionIndex: 0,
  isRevealed: false,
  assertions: 0,
  score: 0,
  isEndGame: false,
};

const DIFFICULTY_SCORES = {
  easy: 1,
  medium: 2,
  hard: 3,
};

const game = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case Types.SAVE_QUESTIONS: {
    return { ...state, questions: action.payload };
  }

  case Types.RIGHT_ANSWER: {
    const { questions, currentQuestionIndex } = state;
    const { timer: { count } } = action;
    const currentQuestion = questions[currentQuestionIndex];
    const { difficulty } = currentQuestion;
    const score = +'10' + (count * DIFFICULTY_SCORES[atob(difficulty)]);
    const newScore = state.score + score;
    const newAssertions = state.assertions + 1;

    return {
      ...state,
      isRevealed: true,
      score: newScore,
      assertions: newAssertions,
    };
  }

  case Types.WRONG_ANSWER: {
    return {
      ...state,
      isRevealed: true,
    };
  }

  case Types.INIT_GAME: {
    return {
      ...state,
      ...INITIAL_STATE,
    };
  }

  case Types.NEXT_QUESTION: {
    const newQuestionIndex = state.currentQuestionIndex + 1;
    return {
      ...state,
      currentQuestionIndex: newQuestionIndex < state.questions.length
        ? newQuestionIndex : state.currentQuestionIndex,
      isRevealed: false,
      isEndGame: newQuestionIndex >= state.questions.length,
    };
  }

  default:
    return state;
  }
};

export const Creators = {
  saveQuestions: (questions) => ({
    type: Types.SAVE_QUESTIONS,
    payload: questions,
  }),

  fetchQuestions: () => async (dispatch, getState, api) => {
    const { game: { numberOfQuestions } } = getState();
    const token = storage.getToken();
    const data = await api.getQuestions(token, numberOfQuestions);
    dispatch(Creators.saveQuestions(data.results));
  },

  rightAnswer: () => ({
    type: Types.RIGHT_ANSWER,
  }),

  wrongAnswer: () => ({
    type: Types.WRONG_ANSWER,
  }),

  nextQuestion: () => ({
    type: Types.NEXT_QUESTION,
  }),

  initGame: () => ({
    type: Types.INIT_GAME,
  }),
};

export default game;
