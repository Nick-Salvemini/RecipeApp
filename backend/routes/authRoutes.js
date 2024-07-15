const express = require('express');
const router = express.Router();
const { register, login, deleteUser } = require('../controllers/authController');
const { authenticateJWT, ensureLoggedIn, ensureCorrectUser } = require('../middleware/auth');

// Route to register a new user
router.post('/register', register);

// Route to login a user
router.post('/login', login);

// Route to delete a user
router.delete('/delete/:email', authenticateJWT, ensureLoggedIn, ensureCorrectUser, deleteUser)

module.exports = router;