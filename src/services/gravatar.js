import md5 from 'crypto-js/md5';

const getToken = (email) => md5(email).toString();
export default getToken;
