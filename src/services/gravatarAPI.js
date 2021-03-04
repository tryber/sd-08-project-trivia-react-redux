import md5 from 'crypto-js/md5';

const gravatarURL = 'https://www.gravatar.com/avatar/';

const gravatarAPI = (email) => {
  const hashGenerated = md5(email).toString();
  const gravatarImage = `${gravatarURL}${hashGenerated}`;
  return gravatarImage;
};

export default gravatarAPI;
