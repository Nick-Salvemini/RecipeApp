const express = require('express');
const router = express.Router();
const { addRecipe, getRecipe, deleteRecipe, listUserRecipes } = require('../controllers/recipeController');
const { authenticateJWT, ensureLoggedIn, ensureCorrectUser } = require('../middleware/auth');

// Route to add a new recipe
router.post('/', authenticateJWT, ensureLoggedIn, addRecipe);

// Route to get a specific recipe by id
router.get('/:id', authenticateJWT, ensureLoggedIn, getRecipe);

// Route to delete a specific recipe
router.delete('/:id', authenticateJWT, ensureLoggedIn, ensureCorrectUser, deleteRecipe);

// Route to list all recipes for a user
router.get('/user/:user_id', authenticateJWT, ensureLoggedIn, ensureCorrectUser, listUserRecipes);

module.exports = router;