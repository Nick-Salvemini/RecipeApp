const axios = require('axios');
const { OPENAI_API_Key } = require('../config');

const API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions'

/**
 * Generates a recipe based on the provided details using the ChatGPT API.
 * @param {Object} details - An object containing recipe details.
 * @param {string} details.difficulty - The difficulty level of the recipe (beginner, average, expert).
 * @param {string} details.prepCookTime - The preparation and cooking time.
 * @param {string} details.cuisineType - The type of cuisine (country or style).
 * @param {string[]} details.ingredients - A list of up to 5 ingredients.
 * @returns {Promise<string>} - A promise that resolves to the generated recipe.
 */

async function generateRecipe(difficulty, prepCookTime, cuisineType, ingredients) {
    try {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_Key}`
        };

        const prompt = `
            Generate a recipe with the following details:
            Difficulty: ${difficulty}
            Prep/Cook Time: ${prepCookTime}
            Cuisine Type: ${cuisineType}
            Ingredients: ${ingredients.join(", ")}
            Provide a recipe name, list of ingredients, and a detailed step-by-step cooking process.
        `;

        const data = {
            prompt: prompt,
            max_tokens: 500,
            temperature: 0.6
        };

        const response = await axios.post(API_URL, data, { headers });
        return response.data.choices[0].text.trim();
    } catch (error) {
        console.error('Failed to generate recipe:', error);
        throw new Error('Failed to communicate with the recipe generation service.');
    }
}

module.exports = { generateRecipe }