let express = require('express');
let app = express();
app.use(require('./lib/logger'));
app.get('/', (req, res) => {
  res.status(200).send('Hello world');
});
app.listen(3000);
