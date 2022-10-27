setTimeout(() => {
  process.send({ hello: 'message from child.' });
}, 3000);
