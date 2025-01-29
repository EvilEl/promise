/*
  Чтобы получить самый быстрый результат среди асинхронных функций,
 следует использовать Promise.race
*/

const { createLimitPromise } = require("./limitPromise");

Promise.race([
  createLimitPromise(),
  createLimitPromise({ limit: 2000, value: "noLimit" }),
]).then((res) => {
  console.log(res);
});

Promise.race([createLimitPromise(), createLimitPromise({ limit: 4000 })]).then(
  (res) => {
    console.log(res);
  }
);

Promise.race([createLimitPromise(), createLimitPromise({ limit: 4000 })]).then(
  (res) => {
    console.log(res);
  }
);

/**
  Будет отклонен так как первый заверишлся с ошибкой,
  если требуется найти первый успешный то следует использоваться
  Promise.any
 */
Promise.race([
  createLimitPromise(),
  createLimitPromise({ limit: 4000 }),
  createLimitPromise({ limit: 1000, isError: true, value: "Ошибочка" }),
]).catch((err) => {
  console.log(err);
});

Promise.race([]).then((res) => {
  console.log("Never", res);
});

/**
  Под капотом обернет 3 в Promise.resolve(3)
 */
Promise.race([
  createLimitPromise({ limit: 1000 }),
  createLimitPromise({ limit: 500 }),
  3,
]).then((res) => {
  console.log(res);
});
