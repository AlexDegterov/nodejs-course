const router = require('express').Router();
const { catchError } = require('../../helpers/error');
const { generateToken } = require('./login.service');
const createError = require('http-errors');

router.route('/').post(
  catchError(async (req, res, next) => {
    const loginData = req.body;
    const token = await generateToken(loginData);
    if (!token) {
      return next(createError(403, 'Bad login/password combination'));
    }
    res.status(200).json({ auth: true, token });
    return next();
  })
);

module.exports = router;
