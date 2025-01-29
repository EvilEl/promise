const config = {
  limit: 3000,
  value: "limitPromise",
  isError: false,
};

const createLimitPromise = ({ limit, value, isError } = config) =>
  new Promise((res, rej) => {
    setTimeout(() => {
      if (isError) {
        rej(value);
      }
      res(value);
    }, limit);
  });

module.exports = { createLimitPromise };
