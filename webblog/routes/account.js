let router = require('express').Router();

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
  res.render('./account/posts/regist-form.ejs');
});

router.post('/posts/regist/input', (req, res) => {
  let original = createRegistData(req.body);
  res.render('./account/posts/regist-form.ejs', { original });
});

module.exports = router;
