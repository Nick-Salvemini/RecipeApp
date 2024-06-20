const Recipe = require("../models/recipe");
const { generateRecipe } = require("../services/chatGptService")
const { NotFoundError } = require("../expressError");

/** Functions for recipe management. */

async function addRecipe(req, res, next) {
    try {
        const { user_id, name, difficulty, prep_cook_time, cuisine_type, ingredients, steps } = req.body;
        // const recipe = await Recipe.create({ user_id, name, difficulty, prep_cook_time, cuisine_type, ingredients, steps });

        console.log('Received in addRecipe:', req.body);

        const generatedRecipe = await generateRecipe(difficulty, prep_cook_time, cuisine_type, ingredients)

        return res.status(201).json({ generatedRecipe });
    } catch (err) {
        return next(err)
    }
}

async function saveRecipe(req, res, next) {
    try {
        const { user_id, name, difficulty, prep_cook_time, cuisine_type, ingredients, steps } = req.body;
        console.log('Received in saveRecipe:', req.body);
        const recipe = await Recipe.create({ user_id, name, difficulty, prep_cook_time, cuisine_type, ingredients, steps });
        return res.status(201).json({ recipe });
    } catch (err) {
        return next(err);
    }
}


async function getRecipe(req, res, next) {
    try {
        const { id } = req.params;
        const recipe = await Recipe.get(id);
        return res.json({ recipe })
    } catch (err) {
        return next(err)
    }
}


async function deleteRecipe(req, res, next) {
    try {
        const { id } = req.params;
        await Recipe.remove(id);
        return res.status(204).send();
    } catch (err) {
        return next(err)
    }
}


async function listUserRecipes(req, res, next) {
    try {
        const { user_id } = req.params;
        const recipes = await Recipe.findAllByUser(user_id);
        return res.json({ recipes });
    } catch (err) {
        return next(err)
    }
}

module.exports = {
    addRecipe,
    saveRecipe,
    getRecipe,
    deleteRecipe,
    listUserRecipes
};