"use strict";

const { db } = require("../database/db");
const { sqlForPartialUpdate } = require("../helpers/sqlForPartialUpdate");
const { NotFoundError } = require("../expressError");

/** Related functions for recipes. */

class Recipe {
    /** Create a recipe with data.
     *
     * Returns { id, user_id, name, difficulty, prep_cook_time, cuisine_type, ingredients, steps }
     *
     * Throws BadRequestError on duplicates or other insertion errors.
     **/

    static async create({ user_id, name, difficulty, prep_cook_time, cuisine_type, ingredients, steps }) {
        const result = await db.query(
            `INSERT INTO recipes
                (user_id, name, difficulty, prep_cook_time, cuisine_type, ingredients, steps)
            VALUES ($1,$2,$3,$4,$5,$6,$7)
            RETURNING id, user_id, name, difficulty, prep_cook_time, cuisine_type, ingredients, steps`,
            [user_id, name, difficulty, prep_cook_time, cuisine_type, ingredients, steps]
        );

        const recipe = result.rows[0];
        return recipe;
    }

    /** Find all recipes by a user.
     *
     * Returns [{ id, name, difficulty, prep_cook_time, cuisine_type, ingredients, steps }, ...]
     **/

    static async findAllByUser(user_id) {
        const result = await db.query(
            `SELECT id, name, difficulty, prep_cook_time, cuisine_type, ingredients, steps
            FROM recipes
            WHERE user_id = $1`,
            [user_id]
        );

        return result.rows;
    }

    /** Get a recipe by id.
     *
     * Returns { id, user_id, name, difficulty, prep_cook_time, cuisine_type, ingredients, steps }
     *
     * Throws NotFoundError if not found.
     **/
    static async get(id) {
        const result = await db.query(
            `SELECT id, user_id, name, difficulty, prep_cook_time, cuisine_type, ingredients, steps
            FROM recipes
            WHERE id = $1`,
            [id]
        );

        const recipe = result.rows[0];
        if (!recipe) throw new NotFoundError(`No recipe found with id: ${id}`);

        return recipe
    }

    /** Delete given recipe from database; returns undefined.
     *
     * Throws NotFoundError if recipe not found.
     **/

    static async remove(id) {
        const result = await db.query(
            `DELETE FROM recipes
            WHERE id = $1
            RETURNING id`,
            [id]
        );

        const recipe = result.rows[0];
        if (!recipe) throw new NotFoundError(`No recipe: ${id}`);
    }
}

module.exports = Recipe;