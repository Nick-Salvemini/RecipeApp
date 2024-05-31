import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import recipeService from '../../services/recipeService';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        recipeService.fetchRecipes()
            .then(data => {
                setRecipes(data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading recipes...</p>;

    return (
        <div>
            <h1>Recipes</h1>
            {recipes.length > 0 ? (
                <ul>
                    {recipes.map(recipe => (
                        <li key={recipe.id}>
                            <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No recipes found.</p>
            )}
        </div>
    );
};

export default RecipeList;