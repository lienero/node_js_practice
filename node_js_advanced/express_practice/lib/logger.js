module.exports = function (req, res, next) {
  let ipaddress =
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    (req.socket && req.socket.remoteAddress) ||
    (req.connection.socket && req.connection.socket.remoteAddress) ||
    '0.0.0.0';
  let date = new Date().toISOString();
  let method = req.method;
  let url = req.url;
  let ua = req.headers['user-agent'];

  console.log(`${ipaddress} [${date}] "${method} ${url}" - ${ua}`);

  next();
};
