/*
 Promise.all - запускает асинхронные функции параллельно и дожидается их
 возвращения
*/
const { createLimitPromise } = require("./limitPromise");

Promise.all([
  createLimitPromise({ text: "1" }),
  createLimitPromise({ text: "2" }),
  createLimitPromise({ text: "3" }),
]).then(console.log);

/*
  Вернется с ошибкой и не будет дожидаться когда выполнятся другие
  асиннхроные функции
*/
Promise.all([
  createLimitPromise({ text: "1", limit: 999 }),
  createLimitPromise({ text: "2", limit: 777 }),
  createLimitPromise({ text: "3", isError: true, limit: 500 }),
]).catch(console.log);
