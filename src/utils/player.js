export const getPlayer = () => JSON.parse(localStorage.getItem('state')) || {};

export const getRanking = () => JSON.parse(localStorage.getItem('ranking')) || [];

export const setNewScore = (addScore) => {
  const { player } = getPlayer();

  if (!player.name) return;

  const newPlayer = {
    ...player,
    score: player.score + addScore,
    assertions: player.assertions + 1,
  };

  localStorage.setItem('state', JSON.stringify({ player: newPlayer }));
};

export const savePlayerAtRanking = () => {
  const { player } = getPlayer();
  const ranking = getRanking();

  if (!player.name) return;

  const newRanking = [...ranking, player];
  newRanking.sort((player1, player2) => player2.score - player1.score);

  localStorage.setItem(
    'ranking',
    JSON.stringify(newRanking),
  );
};
