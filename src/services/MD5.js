import md5 from 'crypto-js/md5';

const md5email = (value) => md5(value).toString();

export default md5email;
