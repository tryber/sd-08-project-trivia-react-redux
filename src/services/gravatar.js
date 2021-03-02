const getResponse = (response) => (
  response
    .json()
    .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
);

const getGravatar = (hash) => (
  fetch(`https://www.gravatar.com/avatar/${hash}`)
    .then((response) => getResponse(response))
);

export default getGravatar;
