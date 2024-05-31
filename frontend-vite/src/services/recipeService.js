import http from '../utilities/http';

const recipeService = {
    createRecipe: async (recipeData) => {
        try {
            const response = await http.post('/recipes', recipeData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    fetchRecipes: async () => {
        try {
            const response = await http.get('/recipes');
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    deleteRecipe: async (id) => {
        try {
            await http.delete(`/recipes/${id}`);
        } catch (error) {
            throw error;
        }
    }
};

export default recipeService;
