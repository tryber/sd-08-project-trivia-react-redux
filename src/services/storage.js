export const saveToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => localStorage.getItem('token');

export const clearToken = () => {
  localStorage.setItem('token', '');
};

export const getRanking = () => localStorage.getItem('ranking');

export const setRanking = (newRanking) => {
  localStorage.setItem('ranking', JSON.stringify(newRanking));
};

export const updatePlayer = (updatedData) => {
  const state = localStorage.getItem('state');
  const player = state ? state.player : {};
  const updatedPlayer = { ...player, ...updatedData };
  const updatedState = { player: updatedPlayer };
  localStorage.setItem('state', JSON.stringify(updatedState));
};
