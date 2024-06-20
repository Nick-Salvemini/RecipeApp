import React, { useState, useContext } from 'react';
import recipeService from '../../services/recipeService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';

const RecipeForm = ({ recipeId }) => {
    const { state } = useAuth();
    const [formData, setFormData] = useState({
        difficulty: '',
        prep_cook_time: '',
        cuisine_type: '',
        ingredients: ['']
    });

    const [generatedRecipe, setGeneratedRecipe] = useState(null);
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

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const payload = { ...formData, user_id: state.user.id, ingredients: formData.ingredients.join(', ') };
    //         const generatedRecipe = await recipeService.createRecipe(payload);
    //         // Show the generated recipe to the user here
    //         console.log(generatedRecipe);
    //         history('/recipes');
    //     } catch (error) {
    //         console.error('Failed to submit recipe', error);
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log('User state in handleSubmit:', state.user);
            const payload = { ...formData, user_id: state.user.id, ingredients: formData.ingredients.join(', ') };
            console.log('Submit payload:', payload);
            const recipe = await recipeService.createRecipe(payload);
            setGeneratedRecipe(recipe.generatedRecipe);
        } catch (error) {
            console.error('Failed to submit recipe', error);
        }
    };

    const handleSaveRecipe = async () => {
        try {
            console.log('User state in handleSaveRecipe:', state.user);
            const payload = { ...formData, user_id: state.user.id, ingredients: formData.ingredients.join(', '), steps: generatedRecipe };
            console.log('Save payload:', payload);
            await recipeService.saveRecipe(payload);
            history('/recipes')
        } catch (err) {
            console.error('Failed to save recipe', err);
        }
    }

    return (
        // <form onSubmit={handleSubmit}>
        //     <select
        //         name="difficulty"
        //         value={formData.difficulty}
        //         onChange={handleChange}
        //         required
        //     >
        //         <option value="">--Select Difficulty--</option>
        //         <option value="easy">Easy</option>
        //         <option value="average">Average</option>
        //         <option value="difficult">Difficult</option>
        //     </select>

        //     <select
        //         name="prep_cook_time"
        //         value={formData.prep_cook_time}
        //         onChange={handleChange}
        //         required
        //     >
        //         <option value="">--Select Prep/Cook Time--</option>
        //         <option value="<20 minutes">{"<20 minutes"}</option>
        //         <option value="20-40 minutes">20-40 minutes</option>
        //         <option value="40-60 minutes">40-60 minutes</option>
        //         <option value="1-2 hours">1-2 hours</option>
        //         <option value="2+ hours">2+ hours</option>
        //     </select>

        //     <input
        //         type="text"
        //         name="cuisine_type"
        //         value={formData.cuisine_type}
        //         onChange={handleChange}
        //         placeholder="Cuisine Type"
        //         required
        //     />

        //     {formData.ingredients.map((ingredient, index) => (
        //         <input
        //             key={index}
        //             type="text"
        //             name={`ingredient_${index}`}
        //             value={ingredient}
        //             onChange={handleChange}
        //             placeholder={`Ingredient ${index + 1}`}
        //             required={index === 0}
        //         />
        //     ))}

        //     {formData.ingredients.length < 5 && (
        //         <button type="button" onClick={handleAddIngredient}>
        //             + Ingredient
        //         </button>
        //     )}

        //     <button type="submit">{recipeId ? 'Update' : 'Create'} Recipe</button>
        // </form>

        <div>
            {generatedRecipe ? (
                <div>
                    <h2>Generated Recipe</h2>
                    <p>{generatedRecipe}</p>
                    <button onClick={handleSaveRecipe}>Save Recipe</button>
                </div>
            ) : (
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
                        name="prep_cook_time"
                        value={formData.prep_cook_time}
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
                        name="cuisine_type"
                        value={formData.cuisine_type}
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
            )}
        </div>
    );
};

export default RecipeForm;