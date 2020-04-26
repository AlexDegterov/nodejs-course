const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../users/user.model');
const { JWT_SECRET_KEY } = require('../../common/config');

const generateToken = async data => {
  const { login, password } = data;
  const user = await User.findOne({ login }).exec();
  const comparePassword = await bcrypt.compare(password, user.password);
  if (!user || !comparePassword) return false;

  const token = await jwt.sign({ userId: user.id, login }, JWT_SECRET_KEY, {
    expiresIn: '1h'
  });
  return token;
};

module.exports = { generateToken };
