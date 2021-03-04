const baseAPI = 'https://opentdb.com';
export const getToken = async () => {
  try{
    const endpoint = `${baseAPI}/api_token.php?command=request`;
    const response = await fetch(endpoint);
    const data = await response.json();
    return data.token;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
export const getQuestions = async () => {
  try{
    const token = await getToken();
    const endpoint = `${baseAPI}/api.php?amount=5&token=${token}`;
    const response = await fetch(endpoint);
    const data = await response.json();
    // console.table(data.results);
    return data.results;
  } catch (error){
    throw new Error(`${error}`);
  }
}
