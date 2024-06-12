import React, { useState } from 'react';
import recipeService from '../../services/recipeService';
import { useNavigate } from 'react-router-dom';

const RecipeForm = ({ recipeId }) => {
    const [formData, setFormData] = useState({
        difficulty: '',
        prepCookTime: '',
        cuisineType: '',
        ingredients: ['']
    });

    const history = useNavigate();

    // const handleChange = (e) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // };

    const handleChange = (evt) => {
        const { name, value } = evt.target;

        if (name.startsWith('ingredient')) {
            const index = parseInt(name.split('_')[1]);
            const newIngredients = [...formData.ingredients];
            newIngredients[index] = value;
            setFormData({ ...formData, ingredients: newIngredients });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    }

    const handleAddIngredient = () => {
        if (formData.ingredients.length < 5) {
            setFormData({ ...formData, ingredients: [...formData.ingredients, ''] });
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await recipeService.createRecipe({ ...formData, ingredients: formData.ingredients.join(', ') });
            history('/recipes');
        } catch (error) {
            console.error('Failed to submit recipe', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                required
            >
                <option value="">--Select Difficulty--</option>
                <option value="easy">Easy</option>
                <option value="average">Average</option>
                <option value="difficult">Difficult</option>
            </select>

            <select
                name="prepCookTime"
                value={formData.prepCookTime}
                onChange={handleChange}
                required
            >
                <option value="">--Select Prep/Cook Time--</option>
                <option value="<20 minutes">{"<20 minutes"}</option>
                <option value="20-40 minutes">20-40 minutes</option>
                <option value="40-60 minutes">40-60 minutes</option>
                <option value="1-2 hours">1-2 hours</option>
                <option value="2+ hours">2+ hours</option>
            </select>

            <input
                type="text"
                name="cuisineType"
                value={formData.cuisineType}
                onChange={handleChange}
                placeholder="Cuisine Type"
                required
            />

            {formData.ingredients.map((ingredient, index) => (
                <input
                    key={index}
                    type="text"
                    name={`ingredient_${index}`}
                    value={ingredient}
                    onChange={handleChange}
                    placeholder={`Ingredient ${index + 1}`}
                    required={index === 0}
                />
            ))}

            {formData.ingredients.length < 5 && (
                <button type="button" onClick={handleAddIngredient}>
                    + Ingredient
                </button>
            )}

            <button type="submit">{recipeId ? 'Update' : 'Create'} Recipe</button>
        </form>
    );
};

export default RecipeForm;