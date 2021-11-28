// eslint-disable-next-line consistent-return

const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.authCheck = async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({
      status: 401,
      error: 'missing token',
      errorMsg: 'missing token',
    });
  }

  token = token.replace('Bearer ', '');

  jwt.verify(token, process.env.TOKEN_SECRET, (err, tokenDecode) => {
    if (err) {
      return res.status(401).send({
        status: 401,
        error: err.message,
        errorMsg: err.name,
      });
    }
    const { role, _id, email } = tokenDecode;
    req.user = {
      role,
      _id,
      email,
    };

    return next();
  });
};

exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;

  const adminUser = await User.findOne({ email }).exec();

  if (adminUser.role !== 'admin') {
    res.status(403).json({
      err: 'Admin resource. Access denied.',
    });
  } else {
    next();
  }
};
