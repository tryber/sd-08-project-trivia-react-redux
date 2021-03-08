export function updateScore(playerEmail, scoreToAdd) {
  const ranking = JSON.parse(localStorage.getItem('ranking'));
  // const newRanking = ranking.map((player) => (
  //   player.email === playerEmail
  //     ? { ...player, score: player.score + scoreToAdd }
  //     : player
  // ));
  console.log(playerEmail);
  const previousScore = ranking[ranking.length - 1].score;
  ranking[ranking.length - 1].score = previousScore + scoreToAdd;
  const newRanking = ranking;
  localStorage.setItem('ranking', JSON.stringify(newRanking));
}

export function createPlayerInRanking(initialPlayerInfos) {
  const ranking = JSON.parse(localStorage.getItem('ranking'));
  if (ranking) {
    // const newRanking = [...ranking, initialPlayerInfos];
    // localStorage.ranking = newRanking;
    ranking.push(initialPlayerInfos);
    localStorage.ranking = JSON.stringify(ranking);
  } else {
    localStorage.setItem('ranking', JSON.stringify([initialPlayerInfos]));
  }
}

export function getCurrentPlayerInfos() {
  const ranking = JSON.parse(localStorage.getItem('ranking'));
  const currentPlayer = ranking[ranking.length - 1];
  const { name, picture, score } = currentPlayer;
  return { name, picture, score };
}

export function getRanking() {
  return JSON.parse(localStorage.getItem('ranking'));
}

export function saveScore() {
  const playerScore = JSON.parse(localStorage.getItem('state')).player.score;
  const ranking = JSON.parse(localStorage.getItem('ranking'));
  const currentPlayer = ranking[ranking.length - 1];
  const playerScoreUpdated = { ...currentPlayer, score: playerScore };
  ranking[ranking.length - 1] = playerScoreUpdated;
  localStorage.setItem('ranking', JSON.stringify(ranking));
}
