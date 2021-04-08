export default async function getToken() {
  const endpoint = 'https://opentdb.com/api_token.php?command=request';
  const token = await fetch(endpoint);
  const tokenJson = await token.json();
  return tokenJson;
}
