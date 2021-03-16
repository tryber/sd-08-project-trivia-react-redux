export const LOGIN = 'LOGIN';
export const FETCHQUESTIONS = 'FETCH_QUESTIONS';
export const ASSERTIONS_SCORE = 'ASSERTIONS_SCORE';

export const login = (value) => ({ type: LOGIN, value });

export const fetchQuestion = (questions) => ({ type: FETCHQUESTIONS, questions });

export const assertionsScore = (value) => ({ type: ASSERTIONS_SCORE, value });
