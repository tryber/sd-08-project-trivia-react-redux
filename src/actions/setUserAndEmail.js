export const setUserAndEmail = (value) => ({
  type: 'SAVE_USER',
  payload: value,
});

export const getImageOfUser = (value) => ({
  type: 'SAVE_GRAVATAR_IMAGE',
  payload: value,
});
