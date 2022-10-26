const { Readable } = require('stream');
const randomstring = require('./randomstring.js');
const data = randomstring();

let CustomReader = class extends Readable {
  constructor(options) {
    super(options || { encoding: 'utf8' });
    this._current = 0;
  }

  _read(size) {
    let start = this._current;
    let end = start + size < data.length ? start + size : data.length;
    let chunk;

    try {
      chunk = data.slice(start, end);
    } catch (error) {
      process.nextTick(() => {
        this.emit('error', error);
      });
      return;
    }

    this.push(chunk);

    if (start + size < data.length) {
      this._current = end;
    } else {
      this.push(null);
    }
  }
};

module.exports = CustomReader;
