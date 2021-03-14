import gravatarAPI from '../services/gravatarAPI';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (error) {
    // ignore write errors
  }
};

export const saveRanking = (state) => {
  let rankingString = localStorage.getItem('ranking');
  let ranking = [];
  ranking = JSON.parse(rankingString);
  ranking.push({ name: state.player.name,
    score: state.player.score,
    picture: gravatarAPI(state.player.email) });
  rankingString = JSON.stringify(ranking);
  localStorage.setItem('ranking', rankingString);
};

// código desenvolvido por: Jam Creencia
// https://medium.com/@jrcreencia/persisting-redux-state-to-local-storage-f81eb0b90e7e

// explicação do código para o projeto: Thadeu C B Ramos
// https://github.com/thadeucbr
