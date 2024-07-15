import React, { useState, useCallback, useEffect } from 'react';
import recipeService from '../../services/recipeService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';
import RecipeDetails from './RecipeDetails';
import '../../styles/form.css';
import PanGif from '../../assets/images/PanGif.gif';

const RecipeForm = ({ recipeId }) => {
    const { state } = useAuth();
    const [formData, setFormData] = useState({
        difficulty: '',
        prep_cook_time: '',
        cuisine_type: '',
        ingredients: ['']
    });
    const [errors, setErrors] = useState({});
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

        const newErrors = { ingredients: [] };

        if (formData.ingredients.some(ingredient => ingredient.trim() === '')) {
            formData.ingredients.forEach((ingredient, index) => {
                if (ingredient.trim() === '') {
                    newErrors.ingredients[index] = 'Please provide 1-5 ingredients.';
                }
            });
        }

        if (!formData.cuisine_type.trim()) {
            newErrors.cuisine_type = 'Please provide a cuisine type.';
        }

        if (!formData.prep_cook_time.trim()) {
            newErrors.prep_cook_time = 'Please provide a prep/cook time.';
        }

        if (!formData.difficulty.trim()) {
            newErrors.difficulty = 'Please select a difficulty level.';
        }

        if (Object.keys(newErrors).some(key => newErrors[key].length > 0)) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);

        try {
            if (state.user && state.user.id) {
                const payload = { ...formData, user_id: state.user.id, ingredients: formData.ingredients.join(', ') };
                const recipe = await recipeService.createRecipe(payload);
                console.log("Generated Recipe:", recipe);
                setGeneratedRecipe(recipe);
            } else {
                throw new Error("User not authenticated");
            }
        } catch (error) {
            console.error('Failed to submit recipe', error);
        } finally {
            setLoading(false);
        }
    }, [formData, state.user])

    useEffect(() => {
        console.log("Generated Recipe Updated:", generatedRecipe);
    }, [generatedRecipe]);

    const handleSaveRecipe = useCallback(async () => {
        try {
            if (state.user && state.user.id) {
                const payload = {
                    user_id: state.user.id,
                    name: generatedRecipe.Name,
                    difficulty: generatedRecipe.Difficulty,
                    prep_cook_time: generatedRecipe["Prep/Cook Time"],
                    cuisine_type: generatedRecipe["Cuisine Type"],
                    ingredients: generatedRecipe.Ingredients.join(', '),
                    steps: generatedRecipe.Steps.join('. ')
                };
                await recipeService.saveRecipe(payload);
                history('/recipes')
            } else {
                throw new Error("User not authenticated");
            }
        } catch (err) {
            console.error('Failed to save recipe', err);
        }
    }, [generatedRecipe, state.user, history])

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
                    <img src={PanGif} alt="Cooking..." width="240" height="240" />
                    <p>Cooking...</p>
                </div>
            ) : generatedRecipe ? (
                <div>
                    <RecipeDetails recipe={generatedRecipe} />
                    <button className="btn btn-primary mt-3" onClick={handleSaveRecipe}>Save Recipe</button>
                    <button className="btn btn-secondary mt-3 ms-2" onClick={handleNewRecipe}>New Recipe</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="w-100 mx-auto mt-5 needs-validation" noValidate>
                    <div className="mb-3 row">
                        <label htmlFor="difficulty" className="col-sm-3 col-form-label">Difficulty:</label>
                        <div className="col-sm-9">
                            <select
                                id="difficulty"
                                name="difficulty"
                                value={formData.difficulty}
                                onChange={handleChange}
                                className={`form-control ${errors.difficulty ? 'is-invalid' : ''}`}
                                required
                            >
                                <option value="">--Select Difficulty--</option>
                                <option value="easy">Easy</option>
                                <option value="average">Average</option>
                                <option value="difficult">Difficult</option>
                            </select>
                            {errors.difficulty && (
                                <div className="invalid-feedback">
                                    {errors.difficulty}
                                </div>
                            )}
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
                                className={`form-control ${errors.prep_cook_time ? 'is-invalid' : ''}`}
                                required
                            >
                                <option value="">--Select Prep/Cook Time--</option>
                                <option value="<20 minutes">{"<20 minutes"}</option>
                                <option value="20-40 minutes">20-40 minutes</option>
                                <option value="40-60 minutes">40-60 minutes</option>
                                <option value="1-2 hours">1-2 hours</option>
                                <option value="2+ hours">2+ hours</option>
                            </select>
                            {errors.prep_cook_time && (
                                <div className="invalid-feedback">
                                    {errors.prep_cook_time}
                                </div>
                            )}
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
                                className={`form-control ${errors.cuisine_type ? 'is-invalid' : ''}`}
                                placeholder="Cuisine Type"
                                required
                            />
                            {errors.cuisine_type && (
                                <div className="invalid-feedback">
                                    {errors.cuisine_type}
                                </div>
                            )}
                        </div>
                    </div>
                    {formData.ingredients.map((ingredient, index) => (
                        <div key={index} className="mb-3 row">
                            <label htmlFor={`ingredient_${index}`} className="col-sm-3 col-form-label">Ingredient {index + 1}:</label>
                            <div className="col-sm-9">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        id={`ingredient_${index}`}
                                        name={`ingredient_${index}`}
                                        value={ingredient}
                                        onChange={handleChange}
                                        className={`form-control ${errors.ingredients ? 'is-invalid' : ''}`}
                                        placeholder={`Ingredient ${index + 1}`}
                                        required={index === 0}
                                    />
                                    <div className="input-group-append">
                                        {index > 0 && (
                                            <button
                                                type="button"
                                                className="btn btn-outline-danger"
                                                onClick={() => handleRemoveIngredient(index)}
                                            >
                                                <i className="bi bi-x"></i>
                                            </button>
                                        )}
                                    </div>
                                </div>
                                {errors.ingredients && errors.ingredients[index] && (
                                    <div className="invalid-feedback">
                                        Please provide 1-5 ingredients.
                                    </div>
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