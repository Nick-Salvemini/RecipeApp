import React, { useState, useCallback } from 'react';
import recipeService from '../../services/recipeService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';
import RecipeDetails from './RecipeDetails';

const RecipeForm = ({ recipeId }) => {
    const { state } = useAuth();
    const [formData, setFormData] = useState({
        difficulty: '',
        prep_cook_time: '',
        cuisine_type: '',
        ingredients: ['']
    });
    const [generatedRecipe, setGeneratedRecipe] = useState(null);
    const [loading, setLoading] = useState(false);
    const history = useNavigate();

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

    const handleAddIngredient = useCallback(() => {
        if (formData.ingredients.length < 5) {
            setFormData({ ...formData, ingredients: [...formData.ingredients, ''] });
        }
    }, [formData])

    const handleRemoveIngredient = useCallback((index) => {
        const newIngredients = formData.ingredients.filter((_, i) => i !== index);
        setFormData({ ...formData, ingredients: newIngredients });
    }, [formData])

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        // Check for empty ingredient inputs
        if (formData.ingredients.some(ingredient => ingredient.trim() === '')) {
            alert('Please fill out all ingredient fields.');
            return;
        }

        setLoading(true);

        try {
            console.log('User state in handleSubmit:', state.user);
            const payload = { ...formData, user_id: state.user.id, ingredients: formData.ingredients.join(', ') };
            console.log('Submit payload:', payload);
            const recipe = await recipeService.createRecipe(payload);
            console.log('Generatred recipe:', recipe.generatedRecipe)
            try {

                setGeneratedRecipe(JSON.parse(recipe.generatedRecipe));
            } catch (e) {
                console.log('parsing generated recipe json failed', e)
            }
        } catch (error) {
            console.error('Failed to submit recipe', error);
        } finally {
            setLoading(false);
        }
    }, [formData])

    const handleSaveRecipe = useCallback(async () => {
        try {
            console.log('User state in handleSaveRecipe:', state.user);
            const payload = {
                user_id: state.user.id,
                name: generatedRecipe.Name,
                difficulty: generatedRecipe.Difficulty,
                prep_cook_time: generatedRecipe["Prep/Cook Time"],
                cuisine_type: generatedRecipe["Cuisine Type"],
                ingredients: generatedRecipe.Ingredients.join(', '),
                steps: generatedRecipe.Steps.join('. ')
            };
            console.log('Save payload:', payload);
            await recipeService.saveRecipe(payload);
            history('/recipes')
        } catch (err) {
            console.error('Failed to save recipe', err);
        }
    }, [generatedRecipe, state])

    const handleNewRecipe = () => {
        setGeneratedRecipe(null);
        setFormData({
            difficulty: '',
            prep_cook_time: '',
            cuisine_type: '',
            ingredients: ['']
        });
    }

    return (
        <div className="container mt-5">
            {loading ? (
                <div className="text-center">
                    <iframe src="https://giphy.com/embed/6rmxsMnN0kSryPsI9p" width="240" height="240" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
                    <p>Cooking...</p>
                </div>

            ) : generatedRecipe ? (
                <div>
                    <RecipeDetails recipe={generatedRecipe} />
                    <button className="btn btn-primary mt-3" onClick={handleSaveRecipe}>Save Recipe</button>
                    <button className="btn btn-secondary mt-3 ms-2" onClick={handleNewRecipe}>New Recipe</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="w-100 mx-auto mt-5">
                    <div className="mb-3 row">
                        <label htmlFor="difficulty" className="col-sm-3 col-form-label">Difficulty:</label>
                        <div className="col-sm-9">
                            <select
                                id="difficulty"
                                name="difficulty"
                                value={formData.difficulty}
                                onChange={handleChange}
                                className="form-control"
                                required
                            >
                                <option value="">--Select Difficulty--</option>
                                <option value="easy">Easy</option>
                                <option value="average">Average</option>
                                <option value="difficult">Difficult</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="prepCookTime" className="col-sm-3 col-form-label">Prep/Cook Time:</label>
                        <div className="col-sm-9">
                            <select
                                id="prepCookTime"
                                name="prep_cook_time"
                                value={formData.prep_cook_time}
                                onChange={handleChange}
                                className="form-control"
                                required
                            >
                                <option value="">--Select Prep/Cook Time--</option>
                                <option value="<20 minutes">{"<20 minutes"}</option>
                                <option value="20-40 minutes">20-40 minutes</option>
                                <option value="40-60 minutes">40-60 minutes</option>
                                <option value="1-2 hours">1-2 hours</option>
                                <option value="2+ hours">2+ hours</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label htmlFor="cuisineType" className="col-sm-3 col-form-label">Cuisine Type:</label>
                        <div className="col-sm-9">
                            <input
                                type="text"
                                id="cuisineType"
                                name="cuisine_type"
                                value={formData.cuisine_type}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Cuisine Type"
                                required
                            />
                        </div>
                    </div>
                    {formData.ingredients.map((ingredient, index) => (
                        <div key={index} className="mb-3 row">
                            <label htmlFor={`ingredient_${index}`} className="col-sm-3 col-form-label">Ingredient {index + 1}:</label>
                            <div className="col-sm-7">
                                <input
                                    type="text"
                                    id={`ingredient_${index}`}
                                    name={`ingredient_${index}`}
                                    value={ingredient}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder={`Ingredient ${index + 1}`}
                                    required={index === 0}
                                />
                            </div>
                            <div className="col-sm-2">
                                {index > 0 && (
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => handleRemoveIngredient(index)}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                    {formData.ingredients.length < 5 && (
                        <div className="mb-3 row">
                            <div className="col-sm-12 text-center">
                                <button type="button" className="btn btn-secondary" onClick={handleAddIngredient}>
                                    + Ingredient
                                </button>
                            </div>
                        </div>
                    )}
                    <div className="mb-3 row">
                        <div className="col-sm-12 text-center">
                            <button type="submit" className="btn btn-primary">{recipeId ? 'Update' : 'Create'} Recipe</button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default RecipeForm;