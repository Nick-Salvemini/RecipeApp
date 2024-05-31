const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

/** return signed JWT from user data. */

function createToken(user) {
  console.assert(user.username !== undefined,
    "createToken passed user without username property");

  let payload = {
    username: user.username
  };

  const options = { expiresIn: '24h' };
  return jwt.sign(payload, SECRET_KEY, options);
}

module.exports = { createToken };