setTimeout(() => {
  console.log('setTimeout()');
}, 100);

setImmediate(() => {
  console.log('setImmediate()');
});

process.nextTick(() => {
  console.log('nextTick()');
});

Promise.resolve().then(() => {
  console.log('Promise.resolve().then()');
});
