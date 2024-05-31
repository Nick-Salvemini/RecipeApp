import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import recipeService from '../../services/recipeService';

const RecipeDetails = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        recipeService.fetchRecipeById(id)
            .then(data => {
                setRecipe(data);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to load recipe');
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            {recipe ? (
                <div>
                    <h1>{recipe.name}</h1>
                    <p>Cuisine: {recipe.cuisineType}</p>
                    <p>Difficulty: {recipe.difficulty}</p>
                    <p>Cook Time: {recipe.prepCookTime}</p>
                    <h3>Ingredients</h3>
                    <ul>
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <h3>Steps</h3>
                    <p>{recipe.steps}</p>
                </div>
            ) : (
                <p>Recipe not found.</p>
            )}
        </div>
    );
};

export default RecipeDetails;