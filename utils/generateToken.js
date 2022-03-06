const jwt = require('jsonwebtoken');

const generateToken = (data, secretKey) => {
  return jwt.sign(data, secretKey, {
    expiresIn : "30d",
  });
}

module.exports = generateToken;