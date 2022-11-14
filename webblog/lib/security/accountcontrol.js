let { CONNECTION_URL, OPTIONS, DATABSE } = require('../../config/mongodb.config');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let MongoClient = require('mongodb').MongoClient;
let initialize, authenticate, authorize;

// 인증완료후에 서버로부터 클라이언트에 보존하는 처리를 지정
passport.serializeUser((email, done) => {
  done(null, email);
});

// 클라이언트로부터 인증정보를 복원하는 처리를 지정
passport.deserializeUser((email, done) => {
  MongoClient.connect(CONNECTION_URL, OPTIONS, (error, client) => {
    let db = client.db(DATABSE);
    db.collection('users')
      .findOne({ email })
      .then((user) => {
        return new Promise((resolve, reject) => {
          db.collection('privileges')
            .findOne({ role: user.role })
            .then((privilege) => {
              user.permissions = privilege.permissions;
              resolve(user);
            })
            .catch((error) => {
              reject(error);
            });
        });
      })
      .then((user) => {
        done(null, user);
      })
      .catch((error) => {
        done(error);
      })
      .then(() => {
        client.close();
      });
  });
});

// local 전략을 사용하기 위한 LocalStrategy 미들웨어 설정
passport.use(
  'local-strategy',
  new LocalStrategy(
    // 옵션
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true,
    },
    // 콜백
    (req, username, password, done) => {
      MongoClient.connect(CONNECTION_URL, OPTIONS, (error, client) => {
        let db = client.db(DATABSE);
        db.collection('users')
          .findOne({
            email: username,
            password: password,
          })
          .then((user) => {
            if (user) {
              req.session.regenerate((error) => {
                if (error) {
                  done(error);
                } else {
                  done(null, user.email);
                }
              });
            } else {
              done(null, false, req.flash('message', 'ユーザー名 または パスワード が間違っています。'));
            }
          })
          .catch((error) => {
            done(error);
          })
          .then(() => {
            client.close();
          });
      });
    },
  ),
);

// 필요한 미들웨어 습득
initialize = function () {
  return [passport.initialize(), passport.session()];
};

authenticate = function () {
  return passport.authenticate('local-strategy', {
    successRedirect: '/account/',
    failureRedirect: '/account/login',
  });
};

authorize = function (privilege) {
  return function (req, res, next) {
    // indexOf : 찾는 문자열이 없으면 -1을 리턴합니다.
    if (req.isAuthenticated() && (req.user.permissions || []).indexOf(privilege) >= 0) {
      next();
    } else {
      res.redirect('/account/login');
    }
  };
};

module.exports = {
  initialize,
  authenticate,
  authorize,
};
