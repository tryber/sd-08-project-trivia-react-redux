const requestAPITrivia = async (currentMode) => {
  const token = localStorage.getItem('token');
  const request = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}&difficulty=${currentMode}`);
  const json = await request.json();
  return json;
};

export default requestAPITrivia;
