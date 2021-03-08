import { createLocalStoragePlayer } from '../../localStorage';

export const SAVE_USER = 'SAVE_USER';

export const user = (email, name) => {
  createLocalStoragePlayer({ email, name });
  return {
    type: SAVE_USER,
    email,
    name,
  };
};
