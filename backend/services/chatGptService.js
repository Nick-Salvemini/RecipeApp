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

// async function generateRecipe(difficulty, prepCookTime, cuisineType, ingredients) {
//     try {
//         const headers = {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${OPENAI_API_KEY}`
//         };

//         const prompt = `
//             Generate a recipe with the following details:
//             Difficulty: ${difficulty}
//             Prep/Cook Time: ${prepCookTime}
//             Cuisine Type: ${cuisineType}
//             Ingredients: ${ingredients}
//             Provide a recipe name, list of ingredients, and a detailed step-by-step cooking process.
//         `;

//         const data = {
//             "model": "gpt-4",
//             "messages": [
//                 {
//                     "role": "system",
//                     "content": "You are a helpful assistant."
//                 },
//                 {
//                     "role": "user",
//                     "content": prompt
//                 }
//             ],
//             "temperature": .6,
//             "max_tokens": 256
//         };

//         const response = await axios.post(API_URL, data, { headers });
//         return response.data.choices[0].text.trim();
//     } catch (error) {
//         if (error.response && error.response.status === 429) {
//             console.error('Rate limit exceeded. Please try again later.');
//             throw new Error('Rate limit exceeded. Please try again later.');
//         } else {
//             console.error('Failed to generate recipe:', error);
//             // console.error('Failed to generate recipe:', error.data.error);
//             throw new Error('Failed to communicate with the recipe generation service.');
//         }
//     }
// }

async function generateRecipe(difficulty, prepCookTime, cuisineType, ingredients) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
    };

    const prompt = `
                    Generate a recipe with the following details:
                    Difficulty: ${difficulty}
                    Prep/Cook Time: ${prepCookTime}
                    Cuisine Type: ${cuisineType}
                    Ingredients: ${ingredients}
                    Provide a recipe name, list of ingredients, and a detailed step-by-step cooking process.
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
        "max_tokens": 256
    };

    let retryCount = 0;
    let maxRetries = 5;

    while (retryCount < maxRetries) {
        try {
            const response = await axios.post(API_URL, data, { headers });

            console.log(response)
            return response.data.choices[0].message.content.trim();
        } catch (error) {
            if (error.response && error.response.status === 429) {
                const retryAfter = error.response.headers['retry-after'] || (2 ** retryCount * 1000);
                console.log(error.response.data)
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