// https://stackoverflow.com/questions/7394748/whats-the-right-way-to-decode-a-string-that-has-special-html-entities-in-it/7394787#7394787
export default function decodeHtml(encodedString) {
  const txt = document.createElement('textarea');
  txt.innerHTML = encodedString;
  return txt.value;
}
