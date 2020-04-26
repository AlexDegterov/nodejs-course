const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const { JWT_SECRET_KEY } = require('../common/config');

const checkToken = async (req, res, next) => {
  try {
    const receivedToken = req.headers.authorization.split(' ')[1];
    await jwt.verify(receivedToken, JWT_SECRET_KEY);
    return next();
  } catch (err) {
    return next(createError(401, 'Unauthorized'));
  }
};

module.exports = { checkToken };
