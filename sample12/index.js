let EventEmitter = require('events');
let ee = new EventEmitter();

// let ontick = function () {
//   console.log('event is called.');
//   ee.off('event', ontick);
// };

// ee.on('event', ontick);
// ee.once('event', ontick);

// ee.emit('event');

ee.on('event', function () {
  console.log('function : \r\n', this);
});
ee.on('event', () => {
  console.log('arrow : \r\n', this);
});

// 이벤트의 삭제 기능도 하는듯
ee.emit('event');
