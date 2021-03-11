import { USER, TOKEN } from './index';

export const actionUser = (name, emailGravatar) => ({
  type: USER, payload: { name, emailGravatar },
});
export const actionToken = (token) => ({ type: TOKEN, payload: { token } });
