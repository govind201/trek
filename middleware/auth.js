const jwt = require('jsonwebtoken');
const config = require('config');
//add this middleware fuction to  the routes that modify data;
module.exports = function (req, res, next) {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access denied No token provided');
  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decoded; // Here we put the playloads in req.user object so that we can acces them
    next();
  } catch (ex) {
    res.status(400).send('Invalid token');
  }
};
