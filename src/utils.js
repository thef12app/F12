export const iteratorToArray = (it) => {
  const arr = [];

  let result = it.next();
  while (!result.done) {
    arr.push(result.value);
    result = it.next();
  }

  return arr;
};

export const composeURL = (url) => {
  const urlConstructed = [
    url.protocol,
    '://',
    url.username,
    url.password && ':',
    url.password,
    (url.password || url.username) && '@',
    url.hostname,
    url.port !== '' && url.port != null && ':',
    url.port,
    url.pathname || '/',
    url.search,
    url.hash,
  ]
    .filter((s) => s)
    .join('');

  return urlConstructed;
};
