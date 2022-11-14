let { CONNECTION_URL, OPTIONS, DATABASE } = require('../config/mongodb.config');
let router = require('express').Router();
let MongoClient = require('mongodb').MongoClient;
let tokens = new require('csrf')();

// 에러처리
let validateRegistData = function (body) {
  let isValidated = true,
    errors = {};

  if (!body.url) {
    isValidated = false;
    errors.url = "URLが未入力です。'/'から始まるURLを入力してください。";
  }

  if (body.url && /^\//.test(body.url) === false) {
    isValidated = false;
    errors.url = "'/'から始まるURLを入力してください。";
  }

  if (!body.title) {
    isValidated = false;
    errors.title = 'タイトルが未入力です。任意のタイトルを入力してください。';
  }

  // isValidated가 true면 undefined 반환, false 면 errors 반환
  return isValidated ? undefined : errors;
};

let createRegistData = function (body) {
  let datetime = new Date();
  return {
    url: body.url,
    published: datetime,
    updated: datetime,
    title: body.title,
    content: body.content,
    keywords: (body.keywords || '').split(','),
    authors: (body.authors || '').split(','),
  };
};

router.get('/', (req, res) => {
  res.render('./account/index.ejs');
});

router.get('/posts/regist', (req, res) => {
  tokens.secret((error, secret) => {
    let token = tokens.create(secret);
    req.session._csrf = secret;
    res.cookie('_csrf', token);
    res.render('./account/posts/regist-form.ejs');
  });
});

router.post('/posts/regist/input', (req, res) => {
  let original = createRegistData(req.body);
  res.render('./account/posts/regist-form.ejs', { original });
});

router.post('/posts/regist/confirm', (req, res) => {
  let original = createRegistData(req.body);
  let errors = validateRegistData(req.body);
  if (errors) {
    res.render('./account/posts/regist-form.ejs', { errors, original });
    return;
  }
  res.render('./account/posts/regist-confirm.ejs', { original });
});

router.post('/posts/regist/execute', (req, res) => {
  let secret = req.session._csrf;
  let token = req.cookies._csrf;

  if (tokens.verify(secret, token) === false) {
    throw new Error('Invalid Token.');
  }
  let original = createRegistData(req.body);
  let errors = validateRegistData(req.body);
  if (errors) {
    res.render('./account/posts/regist-form.ejs', { errors, original });
    return;
  }
  MongoClient.connect(CONNECTION_URL, OPTIONS, (error, client) => {
    let db = client.db(DATABASE);
    db.collection('posts')
      .insertOne(original)
      .then((doc) => {
        res.render('./account/posts/regist-complete.ejs');
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
