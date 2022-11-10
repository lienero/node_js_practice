var { CONNECTION_URL, OPTIONS, DATABASE } = require('../config/mongodb.config.js');
var router = require('express').Router();
var MongoClient = require('mongodb').MongoClient;

router.get('/*', (req, res) => {
  let keyword = req.query.keyword || '';

  // RegExp : 정규표현식, 객체는 리터럴 표기법과 생성자로써 생성할 수 있습니다.
  let regexp = new RegExp(`.*${keyword}.*`);

  MongoClient.connect(CONNECTION_URL, OPTIONS, (error, client) => {
    let db = client.db(DATABASE);
    db.collection('posts')
      .find({
        $or: [{ title: regexp }, { content: regexp }],
      })
      .sort({ published: -1 })
      .toArray()
      .then((list) => {
        let data = {
          keyword,
          list,
        };
        res.render('./search/list.ejs', data);
      })
      .catch((error) => {
        throw error;
      })
      .then(() => {
        client.close();
      });
  });
});

module.exports = router;
