export const SAVE_LOGIN = 'SAVE_LOGIN';
export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const FETCH_ERROR = 'FETCH_ERROR';
export const SAVE_TIME = 'SAVE_TIME';
export const REDIRECT_PAGE = 'REDIRECT_PAGE';
export const REDIRECT_PAGE_FALSE = 'REDIRECT_PAGE_FALSE';
export const RESET_TIMER = 'RESET_TIMER';
export const UNRESET = 'UNRESET';

export const saveUserLogin = (payload) => ({ type: SAVE_LOGIN, payload });
export const saveTime = (payload) => ({ type: SAVE_TIME, payload });
export const resetTimer = () => ({ type: RESET_TIMER });
export const unreset = () => ({ type: UNRESET });
export const redirectPageFalse = () => ({ type: REDIRECT_PAGE_FALSE });

const redirectPage = () => ({ type: REDIRECT_PAGE });
const saveQuestions = (payload) => ({ type: SAVE_QUESTIONS, payload });
const fetchError = (payload) => ({ type: FETCH_ERROR, payload });

export function fetchQuestions(token) {
  return async (dispatch) => {
    try {
      const url = `https://opentdb.com/api.php?amount=5&token=${token}`;
      const response = await fetch(url);
      const questions = await response.json();
      const payload = { questions };
      dispatch(redirectPage());
      return dispatch(saveQuestions(payload));
    } catch (error) {
      const payload = { error };
      return dispatch(fetchError(payload));
    }
  };
}
