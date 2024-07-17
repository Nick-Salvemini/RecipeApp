const axios = require('axios');
const { OPENAI_API_KEY } = require('../config');

const API_URL = 'https://api.openai.com/v1/chat/completions'

/**
 * Generates a recipe based on the provided details using the ChatGPT API.
 * @param {Object} details - An object containing recipe details.
 * @param {string} details.difficulty - The difficulty level of the recipe (beginner, average, expert).
 * @param {string} details.prepCookTime - The preparation and cooking time.
 * @param {string} details.cuisineType - The type of cuisine (country or style).
 * @param {string[]} details.ingredients - A list of up to 5 ingredients.
 * @returns {Promise<string>} - A promise that resolves to the generated recipe.
 */

async function generateRecipe(difficulty, prep_cook_time, cuisine_type, ingredients) {
    // For testing while avoiding calls to ChatGPT 

    // let generatedRecipeObj = {
    //     'Name': 'Fake Recipe Name',
    //     'Difficulty': difficulty,
    //     'Prep/Cook Time': prep_cook_time,
    //     'Cuisine Type': cuisine_type,
    //     'Ingredients': [ingredients, 'Salt', 'Pepper', 'Olive Oil'],
    //     'Steps': ['Take out the chicken', 'Season the chicken', 'Cook the chicken', 'Serve the chicken']
    // }


    // return generatedRecipeObj

    // -------------------------------------

    const prompt = `
                    Create an ${cuisine_type} recipe using ${ingredients}.

                        {
                          "Name": "Recipe Name", 
                          "Difficulty": "${difficulty}", 
                          "Prep/Cook Time": "${prep_cook_time}", 
                          "Cuisine Type": "${cuisine_type}", 
                          "Ingredients": ["Ingredient 1 with quantity", "Ingredient 2 with quantity", "Ingredient 3 with quantity"], 
                          "Steps": ["Step 1", "Step 2", "Step 3", "Step 4"]
                        } Do Not Number Steps
                `;

    const data = {
        "model": "gpt-3.5-turbo-0125",
        "messages": [
            {
                "role": "system",
                "content": "You are a helpful assistant."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        "temperature": .6,
        "max_tokens": 400
    };

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
    };

    let retryCount = 0;
    let maxRetries = 5;

    while (retryCount < maxRetries) {
        try {
            const response = await axios.post(API_URL, data, { headers });
            const message = response.data.choices[0].message.content.trim()

            return JSON.parse(message)
        } catch (error) {
            if (error.response && error.response.status === 429) {
                const retryAfter = error.response.headers['retry-after'] || (2 ** retryCount * 1000);
                console.log(`Rate limit exceeded. Retrying in ${retryAfter / 1000} seconds...`);
                await new Promise(resolve => setTimeout(resolve, retryAfter));
                retryCount++;
            } else {
                console.error('Failed to generate recipe:', error.response.data);
                throw new Error('Failed to communicate with the recipe generation service.');
            }
        }
    }

    throw new Error('Exceeded maximum retry attempts.');
}

module.exports = { generateRecipe }