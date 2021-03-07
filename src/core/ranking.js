// [
//   { name: nome - da - pessoa, score: 10, picture: url - da - foto - no - gravatar },
// ];

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
