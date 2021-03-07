import md5 from 'crypto-js/md5';

import * as trivia from './trivia';

export const gravatarUrl = (email) => {
  const hash = md5(email);
  return `https://www.gravatar.com/avatar/${hash}`;
};

export const getPlayer = () => {
  const data = JSON.parse(localStorage.getItem('state'));
  return data;
};

export const login = async ({ name, email }) => {
  await trivia.retriveApiToken();
  localStorage.setItem('state', JSON.stringify(
    { player: { name, assertions: 0, score: 0, gravatarEmail: email } },
  ));
};

export const updateAssert = (value = 0) => {
  const data = getPlayer();
  data.player.assertions = value;
  localStorage.setItem('state', JSON.stringify(data));
};
export const updateScore = (value = 0) => {
  const data = getPlayer();
  data.player.score = value;
  localStorage.setItem('state', JSON.stringify(data));
};
