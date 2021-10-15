export const iteratorToArray = (it: Iterator<any, any, any>) => {
  const arr = [];

  let result = it.next();
  while (!result.done) {
    arr.push(result.value);
    result = it.next();
  }

  return arr;
};

export const composeURL = (url: any) => {
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

export const fileToDataURI = (file: File) => {
  const reader = new FileReader();

  return new Promise<string>((resolve, reject) => {
    const removeHandlers = () => {
      reader.removeEventListener('load', progressHandler);
      reader.removeEventListener('error', progressHandler);
    };

    const progressHandler = (evt: ProgressEvent<FileReader>) => {
      if (evt.type === 'load') {
        resolve(reader.result as string);
      }

      if (evt.type === 'error') {
        reject(new Error(reader.error?.message || 'Unknown error'));
      }

      if (evt.type === 'load' || evt.type === 'error') {
        removeHandlers();
      }
    };

    reader.addEventListener('load', progressHandler);
    reader.addEventListener('error', progressHandler);
    reader.readAsDataURL(file);
  });
};
