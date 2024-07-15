const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require("../config");
const User = require("../models/user");
const { UnauthorizedError } = require("../expressError");
const { createToken } = require('../helpers/tokens');

/** Register user: { user } => { token }
 *
 * user must include { email, password }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 */

async function register(req, res, next) {
    try {
        const newUser = await User.register({ ...req.body });
        const token = createToken(newUser);
        return res.status(201).json({ token });
    } catch (err) {
        return next(err);
    }
}

/** Login: { email, password } => { token }
 *
 * Returns JWT token which can be used to authenticate further requests.
 *
 */

async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const user = await User.authenticate(email, password);
        const token = createToken(user);
        return res.json({ token, user });
    } catch (err) {
        return next(err);
    }
}

/** Delete user: { email }
 *
 * Returns success message.
 *
 */

async function deleteUser(req, res, next) {
    try {
        await User.remove(req.params.email);
        return res.json({ message: "User deleted" });
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    register,
    login,
    deleteUser,
};