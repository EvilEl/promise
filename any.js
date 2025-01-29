/*
  Чтобы получить самый быстрый результат среди асинхронных функций без ошибки
 следует использовать Promise.Any,
*/

const { createLimitPromise } = require("./limitPromise");

/**
 Будет отклонен в том случае если все будут отклонены
 */
Promise.any([
  createLimitPromise({ isError: true, text: "Ошибочка-1" }),
  createLimitPromise({ limit: 4000, isError: true, text: "Ошибочка-2" }),
  createLimitPromise({ limit: 1000, isError: true, text: "Ошибочка-3" }),
]).catch(console.log);

Promise.any([])
  .then(() => console.log("never"))
  .catch(() => console.log("Ошибка"));

/*
  Обернет под капотом 1 в Promise.resolve(1)
*/
Promise.any([1]).then(console.log);
