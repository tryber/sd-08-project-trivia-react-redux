export default function newPlayer(player) {
  return {
    type: 'NEW_PLAYER',
    payload: player,
  };
}

export function setScore(score) {
  return {
    type: 'SET_SCORE',
    payload: score,
  };
}

export function resetScore() {
  return {
    type: 'RESET_SCORE',
  };
}

export function updateGravatarUrl(url) {
  return {
    type: 'UPDATE_GRAVATAR_URL',
    payload: url,
  };
}
