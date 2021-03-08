import md5 from 'crypto-js/md5';

export default (email) => {
  const hash = md5(email);
  return `https://www.gravatar.com/avatar/${hash}`;
};
