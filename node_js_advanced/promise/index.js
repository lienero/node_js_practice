let p1 = new Promise((resolve, reject) => {
  // setTimeout(function () {
  //   reject('Hello Worlds.');
  // }, 100);
  setTimeout(function () {
    resolve('p1 complete !');
  }, Math.random() * 3000);
});

let p2 = new Promise((resolve, reject) => {
  setTimeout(function () {
    resolve('p2 complete !');
  }, Math.random() * 3000);
});

// p1.then(
//   (value) => {
//     console.log(`.then() onfullfiled : ${value}`);
//   },
//   (reason) => {
//     console.log(`.then() onrejected : ${reason}`);
//   },
// );

// p1.catch((reason) => {
//   console.log(`.catch() onrejected : ${reason}`);
// });

Promise.all([p1, p2]).then(
  (value) => {
    console.log(value);
  },
  (reason) => {
    console.log(reason);
  },
);
