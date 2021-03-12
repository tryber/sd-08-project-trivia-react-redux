const endPointToken = 'https://opentdb.com/api_token.php?command=request';

const requestToken = async () => {
  try {
    const request = await fetch(endPointToken);
    const json = await request.json();
    localStorage.setItem('token', JSON.stringify(json.token));
  } catch (error) {
    console.log('Erroou');
  }
};

export default requestToken;
