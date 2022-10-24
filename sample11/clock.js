let EventEmitter = require('events');
let Clock = class extends EventEmitter {
  constructor() {
    super();
    this.interval = 2000;
    this.timer = null;
  }
  start() {
    if (this.timer) {
      this.stop();
    }
    // Global 모듈 : node.js에서 모듈을 생성하지 않고 사용할 수 있는 것들을 가지고 있는 모듈 객체
    // setInterval : 주어진 함수를 주어진 시간마다 계속 호출한다.
    this.timer = global.setInterval(() => {
      // emit() 메소드 = 이벤트를 다른쪽으로 전달하고 싶을 경우
      this.emit('tick');
    }, this.interval);
  }
  stop() {
    if (!this.timer) {
      return;
    }
    // clearImmediate : 등록된 Immediate를 제거한다.
    global.clearInterval(this.timer);
    this.timer = null;
  }
};

module.exports = Clock;
