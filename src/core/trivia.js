import axios from 'axios';
import {
  DIFFICULTY_HARD_FACTOR,
  DIFFICULTY_MEDIUM_FACTOR,
  DIFFICULTY_EASY_FACTOR,
  GAME_ROUNDS,
  FEEDBACK_THRESHOLD,
} from '../common/Defs';

const SUCCESS = 200;

export const retriveApiToken = async () => {
  const response = await axios.get(
    'https://opentdb.com/api_token.php?command=request',
  );
  const { status, data } = response;
  if (status === SUCCESS && data.response_code === 0) {
    const { token } = response.data;
    localStorage.setItem('token', token);
    return true;
  }
  return false;
};

const loadToken = async () => {
  if (!localStorage.getItem('token')) {
    await retriveApiToken();
  }
  return localStorage.getItem('token');
};

const getToken = async () => {
  const token = await loadToken();
  const response = await axios.get(
    `https://opentdb.com/api.php?amount=1&token=${token}`,
  );
  const { status } = response;
  if (status !== SUCCESS) {
    await retriveApiToken();
  }
  return localStorage.getItem('token');
};

const parseScore = (difficulty) => {
  if (difficulty === 'hard') return DIFFICULTY_HARD_FACTOR;
  if (difficulty === 'medium') return DIFFICULTY_MEDIUM_FACTOR;
  return DIFFICULTY_EASY_FACTOR;
};

const parseQuestion = async (id, question) => ({
  id,
  category: question.category,
  type: question.type,
  text: question.question,
  difficulty: question.difficulty,
  score: parseScore(question.difficulty),
  answers: [{
    id: 0,
    text: question.correct_answer,
    isCorrect: true,
  },
  ...question.incorrect_answers.map((i, index) => ({
    id: index + 1,
    text: i,
    isCorrect: false,
  })),
  ],
});

export const getQuestions = async (amount = GAME_ROUNDS) => {
  const token = await getToken();
  const response = await axios.get(`https://opentdb.com/api.php?amount=${amount}&token=${token}`);
  const { data } = response;
  return Promise.all(
    data.results.map((question, index) => parseQuestion(index, question)),
  );
};

export const shuffle = (list) => {
  const array = [...list];
  let currentIndex = array.length; let temporaryValue; let
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

export const feedbackEval = (assert) => (assert < FEEDBACK_THRESHOLD
  ? 'Podia ser melhor...'
  : 'Mandou bem!');
