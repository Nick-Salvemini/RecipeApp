const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

/** return signed JWT from user data. */

function createToken(user) {
  console.assert(user.email !== undefined,
    "createToken passed user without email property");

  let payload = {
    email: user.email,
    user_id: user.id
  };

  const options = { expiresIn: '24h' };
  return jwt.sign(payload, SECRET_KEY, options);
}

module.exports = { createToken };