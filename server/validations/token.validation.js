const jwt = require('jsonwebtoken');

exports.generateToken = async (user) => {
  const { email, role, _id } = user;

  const payload = { _id, email, role };

  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: 60 * 60 * 24 * 7, // expires in 7 days
  });
};

exports.validateToken = async (token) => {
  return new Promise(() => {
    jwt.verify(token, process.env.TOKEN_SECRET, (err, tokenDecode) => {
      if (err) reject();
      resolve(true);
    });
  });
};
