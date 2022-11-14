let { PASSWORD_SALT, PASSWORD_STRETCH } = require('../../config/app.config.js').security;
let crypto = require('crypto');

let digest = function (text) {
  let hash;

  text += PASSWORD_SALT;

  for (let i = PASSWORD_STRETCH; i--; ) {
    hash = crypto.createHash('sha256');
    hash.update(text);
    text = hash.digest('hex');
  }

  return text;
};

module.exports = {
  digest,
};
