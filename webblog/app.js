let { SESSION_SECRET } = require('./config/app.config.js').security;
let accesslogger = require('./lib/log/accesslogger.js');
let systemlogger = require('./lib/log/systemlogger.js');
let accountcontrol = require('./lib/security/accountcontrol.js');
let express = require('express');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let flash = require('connect-flash');
let app = express();

app.set('view engine', 'ejs');
app.disable('x-powered-by');

app.use(
  '/public',
  express.static(__dirname + '/public/' + (process.env.NODE_ENV === 'development' ? 'development' : 'production')),
);

app.use(accesslogger());

app.use(cookieParser());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    name: 'sid',
  }),
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(flash());
app.use(...accountcontrol.initialize());

app.use('/', require('./routes/index.js'));
app.use('/posts/', require('./routes/posts.js'));
app.use('/search/', require('./routes/search.js'));
app.use('/account/', require('./routes/account.js'));

app.use(systemlogger());

app.use((req, res, next) => {
  let data = {
    method: req.method,
    protocol: req.protocol,
    version: req.httpVersion,
    url: req.url,
  };
  res.status(404);
  if (req.xhr) {
    res.json(data);
  } else {
    res.render('./404.ejs', { data });
  }
});

app.use((err, req, res, next) => {
  let data = {
    method: req.method,
    protocol: req.protocol,
    version: req.httpVersion,
    url: req.url,
    error:
      process.env.NODE_ENV === 'development'
        ? {
            name: err.name,
            message: err.message,
            stack: err.stack,
          }
        : undefined,
  };
  res.status(500);
  if (req.xhr) {
    res.json(data);
  } else {
    res.render('./500.ejs', { data });
  }
});

app.listen(3000);
