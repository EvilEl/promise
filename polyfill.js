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

Promise.allSettled = (promises) => {
  if (!Array.isArray(promises)) {
    throw new Error("not array");
  }
  const results = [];
  return new Promise((res) => {
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((responce) => {
          results[index] = { status: "fulfilled", value: responce };
        })
        .catch((err) => {
          results[index] = { status: "rejected", value: err };
        })
        .finally(() => {
          if (results.length === promises.length) {
            res(results);
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

const onePromiseObject = {
  limit: 100,
  value: "test 2 limit 100 err",
  isError: true,
};
const twoPromiseObject = {
  limit: 0,
  value: "test 2 limit 0 suc",
  isError: false,
};
const threePromiseObject = {
  limit: 5000,
  value: "test 2 limit 5000 suc",
  isError: false,
};

Promise.allSettled([
  createLimitPromise(onePromiseObject),
  createLimitPromise(twoPromiseObject),
  createLimitPromise(threePromiseObject),
]).then(console.log);
