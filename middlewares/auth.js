const auth = require('basic-auth');

const basicAuth = (req, res, next) => {
  const user = auth(req);
  
  if (!user || user.name !== process.env.ADMIN_USER || user.pass !== process.env.ADMIN_PASS) {
    res.set('WWW-Authenticate', 'Basic realm="Admin Area"');
    return res.status(401).send('Authentication required');
  }
  
  return next();
};

module.exports = basicAuth;