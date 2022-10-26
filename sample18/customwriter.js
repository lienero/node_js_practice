const { Writable } = require('stream');

let CustomWriter = class extends Writable {
  constructor(options) {
    super(options || { decodeStrings: true });
  }

  _write(chunk, encoding, done) {
    let text;
    if (encoding === 'buffer') {
      text = chunk.toString(this._writableState.defaultEncoding);
    } else {
      text = chunk;
    }

    try {
      console.log(text);
    } catch (error) {
      done(error);
      return;
    }

    done();
  }
};

module.exports = CustomWriter;
