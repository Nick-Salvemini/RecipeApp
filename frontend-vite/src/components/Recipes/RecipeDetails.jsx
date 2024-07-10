import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import recipeService from '../../services/recipeService';

const RecipeDetails = ({ recipe: propRecipe }) => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(propRecipe)
    console.log(recipe)
    const [loading, setLoading] = useState(!recipe);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!propRecipe && id) {
            recipeService.fetchRecipeById(id)
                .then(data => {
                    setRecipe(data);
                    setLoading(false);
                })
                .catch(err => {
                    setError('Failed to load recipe');
                    setLoading(false);
                })
        }
    }, [id, propRecipe])

    useEffect(() => {
        console.log('Recipe received in RecipeDetails:', recipe);
    }, [recipe]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const getIngredients = (recipe) => {
        return recipe.Ingredients || recipe.ingredients.split(',') || [];
    };

    const getSteps = (recipe) => {
        return recipe.Steps || recipe.steps.split(',') || [];
    };

    return (
        <div>
            {recipe ? (
                <div>
                    <h1>{recipe.Name || recipe.name}</h1>
                    <p>Cuisine: {recipe["Cuisine Type"] || recipe.cuisine_type}</p>
                    <p>Difficulty: {recipe.Difficulty || recipe.difficulty}</p>
                    <p>Cook Time: {recipe["Prep/Cook Time"] || recipe.prep_cook_time}</p>
                    <h3>Ingredients</h3>
                    <ul>
                        {getIngredients(recipe).map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <h3>Steps</h3>
                    <ol>
                        {getSteps(recipe).map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ol>
                </div>
            ) : (
                <p>Recipe not found.</p>
            )}
        </div>
    );
};

export default RecipeDetails;