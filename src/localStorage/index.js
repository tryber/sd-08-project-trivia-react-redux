import CryptoJS from 'crypto-js';

const initialStatePlayer = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};
const saveResultPlayerStorage = (user = initialStatePlayer) => {
  const player = { ...user };
  if (JSON.parse(localStorage.getItem('state')) === null) {
    localStorage.setItem('state', JSON.stringify({ player }));
  } else {
    localStorage.setItem('state', JSON.stringify({ player }));
  }
};

const getLocalStoragePlayer = () => {
  if (JSON.parse(localStorage.getItem('state'))) {
    return JSON.parse(localStorage.getItem('state'));
  }
  return initialStatePlayer;
};

const createLocalStoragePlayer = ({ name, email }) => {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem('state');
    const player = { ...initialStatePlayer, name, gravatarEmail: email };
    localStorage.setItem('state', JSON.stringify({ player }));
  }
  return { message: 'LocalStorage is not available' };
};

const createHashEmailForUrlPicture = (email) => {
  const hash = CryptoJS.MD5(email);
  const resultHash = hash.toString();
  const urlPicture = `https://www.gravatar.com/avatar/${resultHash}`;
  return urlPicture;
};

// { name: nome-da-pessoa, score: 10, picture: url-da-foto-no-gravatar }

const saveRankingLocalStorage = () => {
  console.log(getLocalStoragePlayer());
  const { player: { name, score, gravatarEmail } } = getLocalStoragePlayer();
  const picture = createHashEmailForUrlPicture(gravatarEmail);
  const player = { name, score, picture };
  console.log(player);
  if (JSON.parse(localStorage.getItem('ranking')) === null) {
    const local = [];
    local.push(player);
    localStorage.setItem('ranking', JSON.stringify(local));
  } else {
    const local = JSON.parse(localStorage.getItem('ranking'));
    const newRanking = [...local, player];
    localStorage.setItem('ranking', JSON.stringify(newRanking));
  }
};

const getLocalStorageRanking = () => {
  if (JSON.parse(localStorage.getItem('ranking'))) {
    return JSON.parse(localStorage.getItem('ranking'));
  }
  return initialStatePlayer;
};

export {
  saveResultPlayerStorage,
  getLocalStoragePlayer,
  createLocalStoragePlayer,
  saveRankingLocalStorage,
  getLocalStorageRanking,
};
