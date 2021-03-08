import {
  saveResultPlayerStorage,
  getLocalStoragePlayer,
} from '../../localStorage';

export const SAVE_SCORE = 'SAVE_SCORE';

const ADD_TEN = 10;
const HARD_LEVEL = 3;
const MIDDLE_LEVEL = 2;

const calculateScore = (level, timer) => {
  console.log(level, timer);
  switch (level) {
  case 'hard':
    return ADD_TEN + (timer * HARD_LEVEL);
  case 'medium':
    return ADD_TEN + (timer * MIDDLE_LEVEL);
  case 'easy':
    return ADD_TEN + timer;
  default:
    return 0;
  }
};

export const actionPlayerScore = (difficultLevel, timer) => {
  const { player } = getLocalStoragePlayer();
  console.log(player);
  player.score += calculateScore(difficultLevel, timer);
  player.assertions += 1;
  saveResultPlayerStorage(player);
  return { type: SAVE_SCORE, score: player.score, assertions: player.assertions };
};
