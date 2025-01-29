const config = {
  limit: 3000,
  text: "limitPromise",
  isError: false,
};

const createLimitPromise = ({ limit, text, isError } = config) =>
  new Promise((res, rej) => {
    setTimeout(() => {
      if (isError) {
        rej(text);
      }
      res(text);
    }, limit);
  });

module.exports = { createLimitPromise };
