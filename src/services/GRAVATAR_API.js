import md5 from 'crypto-js/md5';

const gravatarURL = 'https://www.gravatar.com/avatar/';

function gravatarAPI(email) {
  const hashGenerated = md5(email).toString();
  const gravatarImage = `${gravatarURL}${hashGenerated}`;
  fetch(gravatarImage)
    .then((response) => response.json())
    .then(console.log(gravatarImage));
  return gravatarImage;
}

export default gravatarAPI;
