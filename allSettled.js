const { createLimitPromise } = require("./limitPromise");

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

const promises = Promise.allSettled([
  createLimitPromise(onePromiseObject),
  createLimitPromise(twoPromiseObject),
  createLimitPromise(threePromiseObject),
]).then(console.log);
