let a = require('./lib/module-a/index');
let b = require('./lib/module-b/index');

// 초기화 처리는 1번밖에 일어나지 않는다.(require의 특성)
// Initialize module-a index.js
a();
b();
