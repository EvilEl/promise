const { createLimitPromise } = require("./limitPromise");

Promise.all = (promises) => {
  if (!Array.isArray(promises)) {
    throw new Error("not array");
  }
  let successPromises = 0;
  const data = [];
  return new Promise((res, rej) => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((result) => {
          successPromises++;
          data[index] = result;
          if (successPromises === promises.length) {
            res(data);
          }
        })
        .catch((err) => {
          rej(`catch: ${err}`);
        });
    });
  });
};

Promise.race = (promises) => {
  if (!Array.isArray(promises)) {
    throw new Error("not array");
  }
  return new Promise((res, rej) => {
    promises.forEach((promise) => {
      Promise.resolve(promise)
        .then((result) => {
          res(result);
        })
        .catch((err) => {
          rej(`catch: ${err}`);
        });
    });
  });
};

Promise.any = (promises) => {
  if (!Array.isArray(promises)) {
    throw new Error("not array");
  }
  const errors = [];
  return new Promise((res, rej) => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((result) => {
          res(result);
        })
        .catch((err) => {
          errors[index] = err;
          if (errors.length === promises.length) {
            rej(`catch: ${errors}`);
          }
        });
    });
  });
};

Promise.all([
  createLimitPromise({ value: 3, limit: 500 }),
  createLimitPromise({ value: 2, limit: 1 }),
]).then(console.log);

Promise.all([
  createLimitPromise({ value: 3, limit: 500 }),
  createLimitPromise({ value: 2, limit: 333, isError: true }),
]).catch(console.log);

Promise.race([
  createLimitPromise({ value: 3, limit: 500 }),
  createLimitPromise({ value: 2, limit: 333 }),
]).then(console.log);

Promise.race([
  createLimitPromise({ value: 3, limit: 333, isError: true }),
  createLimitPromise({ value: 2, limit: 555 }),
]).catch(console.log);

Promise.any([
  createLimitPromise({ value: 3, limit: 333, isError: true }),
  createLimitPromise({ value: 2, limit: 555 }),
]).then(console.log);

Promise.any([
  createLimitPromise({ value: 3, limit: 333, isError: true }),
  createLimitPromise({ value: 2, limit: 555, isError: true }),
]).catch(console.log);
