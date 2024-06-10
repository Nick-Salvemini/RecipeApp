const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require("../config");
const User = require("../models/user");
const { UnauthorizedError } = require("../expressError");

/** Functions for user authentication handling. */

async function register(req, res, next) {
    try {
        const { username, password, email } = req.body;
        console.log("line 11", req.body)
        const user = await User.register({ username, password, email });
        console.log("line 13", user)
        const token = jwt.sign({ username: user.username }, SECRET_KEY);
        console.log("line 15", token)
        return res.status(201).json({ user, token });
    } catch (err) {
        console.log("line 18", err)
        return next(err);
    }
}

async function login(req, res, next) {
    try {
        const { username, password } = req.body;
        const user = await User.authenticate(username, password);
        const token = jwt.sign({ username: user.username }, SECRET_KEY);
        return res.json({ user, token });
    } catch (err) {
        return next(err);
    }
}

async function deleteUser(req, res, next) {
    try {
        const username = req.params.username;
        await User.remove(username);
        res.status(204).send();
    } catch (error) {
        return next(error);
    }
}

module.exports = {
    register,
    login,
    deleteUser
}