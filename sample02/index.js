setTimeout(() => {
  console.log('setTimeout()');
}, 100);

console.log('global');

var end = new Date().getTime() + 3000;
while (new Date().getTime() < end) {}
