export function asyncDebounce(fn, delay) {
  let timerId;

  return (...args) => {
    clearTimeout(timerId);

    return new Promise((resolve) => {
      timerId = setTimeout(() => {
        resolve(fn(...args));
      }, delay);
    });
  };
}
