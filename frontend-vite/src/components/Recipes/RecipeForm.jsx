import React, { useState } from 'react';
import recipeService from '../../services/recipeService';
import { useNavigate } from 'react-router-dom';

const RecipeForm = ({ recipeId }) => {
    const [formData, setFormData] = useState({
        name: '',
        difficulty: '',
        prepCookTime: '',
        cuisineType: '',
        ingredients: '',
        steps: ''
    });
    const history = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await recipeService.createRecipe(formData);
            history('/recipes');
        } catch (error) {
            console.error('Failed to submit recipe', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Recipe Name"
                required
            />
            <input
                type="text"
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                placeholder="Difficulty"
                required
            />
            <input
                type="text"
                name="prepCookTime"
                value={formData.prepCookTime}
                onChange={handleChange}
                placeholder="Prep/Cook Time"
                required
            />
            <input
                type="text"
                name="cuisineType"
                value={formData.cuisineType}
                onChange={handleChange}
                placeholder="Cuisine Type"
                required
            />
            <textarea
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                placeholder="Ingredients"
                required
            />
            <textarea
                name="steps"
                value={formData.steps}
                onChange={handleChange}
                placeholder="Cooking Steps"
                required
            />
            <button type="submit">{recipeId ? 'Update' : 'Create'} Recipe</button>
        </form>
    );
};

export default RecipeForm;