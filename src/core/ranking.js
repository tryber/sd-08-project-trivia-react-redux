//
export const loadRanking = () => {
  if (!localStorage.getItem('ranking')) {
    localStorage.setItem('ranking', JSON.stringify([]));
  }
  return JSON.parse(localStorage.getItem('ranking'));
};

export const saveScore = ({ name, score, picture }) => {
  const rank = loadRanking();
  rank.push({ name, score, picture });
  localStorage.setItem('ranking', JSON.stringify(rank));
};
