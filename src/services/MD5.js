import md5 from 'crypto-js/md5';

async function fetchGravatarEmail(email) {
  const md5Email = await md5(email);
  const md5EmailString = md5Email.toString();
  const fetchGravatar = await fetch(`https://www.gravatar.com/avatar/${md5EmailString}`);
  return fetchGravatar;
}

export default fetchGravatarEmail;
