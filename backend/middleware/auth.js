"use strict";

/** Convenience middleware to handle common auth cases in routes. */

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../expressError");


/** Middleware: Authenticate user.
 *
 * If a token was provided, verify it, and, if valid, store the token payload
 * on res.locals (this will include the email field.)
 *
 * It's not an error if no token was provided or if the token is not valid.
 */

function authenticateJWT(req, res, next) {
  const authHeader = req.headers?.authorization;
  if (authHeader) {
    const token = authHeader.replace(/^[Bb]earer\s+/, "").trim();
    try {
      const payload = jwt.verify(token, SECRET_KEY);
      res.locals.user = payload;
    } catch (err) {
    }
  }
  return next();
}

/** Middleware to use when they must be logged in.
 *
 * If not, raises Unauthorized.
 */

function ensureLoggedIn(req, res, next) {
  if (!res.locals.user) {
    return next(new UnauthorizedError());
  }
  return next();
}

/** Middleware to use when they must provide a valid token & be user matching
 *  email provided as route param.
 *
 *  If not, raises Unauthorized.
 */

function ensureCorrectUser(req, res, next) {
  const user = res.locals.user;
  if (!(user && (user.email === req.params.email))) {
    return next(new UnauthorizedError());
  }
  return next();

}


module.exports = {
  authenticateJWT,
  ensureLoggedIn,
  ensureCorrectUser,
};