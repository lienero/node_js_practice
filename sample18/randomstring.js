module.exports = function (max = 10) {
  let data = [];
  let original = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let length = original.length;
  for (let i = 0; i < max; i++) {
    data[i] = original[Math.floor(Math.random() * length)];
  }
  return data.join('');
};
