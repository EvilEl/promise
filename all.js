/*
 Promise.all - запускает асинхронные функции параллельно и дожидается их
 возвращения
*/
const { createLimitPromise } = require("./limitPromise");

Promise.all([
  createLimitPromise({ value: "1" }),
  createLimitPromise({ value: "2" }),
  createLimitPromise({ value: "3" }),
]).then(console.log);

/*
  Вернется с ошибкой и не будет дожидаться когда выполнятся другие
  асиннхроные функции
*/
Promise.all([
  createLimitPromise({ value: "1", limit: 999 }),
  createLimitPromise({ value: "2", limit: 777 }),
  createLimitPromise({ value: "3", isError: true, limit: 500 }),
]).catch(console.log);
