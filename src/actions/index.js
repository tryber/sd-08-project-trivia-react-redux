import { SAVE_USER } from '../services/consts';
import getToken from '../services/getToken';
import getQuestions from '../services/getQuestions';

export const addUser = ({ email, name, hash }) => ({
  type: SAVE_USER,
  email,
  name,
  hash,
});

const requestQuestions = () => ({
  type: 'REQUEST_QUESTION',
});

const receiveQuestions = (objectQuestion) => ({
  type: 'RECEIVE_QUESTION',
  objectQuestion,
});

export function fetchQuestions() {
  const FIVE = 5;
  return (dispatch) => {
    dispatch(requestQuestions());
    return getToken().then(({ token }) => {
      localStorage.setItem('token', token);
      getQuestions(FIVE, token)
        .then((data) => dispatch(receiveQuestions(data)));
    });
  };
}
