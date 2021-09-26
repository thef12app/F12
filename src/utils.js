export const iteratorToArray = (it) => {
  const arr = [];

  let result = it.next();
  while (!result.done) {
    arr.push(result.value);
    result = it.next();
  }

  return arr;
};
