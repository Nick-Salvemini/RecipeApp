import http from '../utilities/http';

const authService = {
    login: async (credentials) => {
        try {
            const response = await http.post('/auth/login', credentials);
            return { token: response.data.token, user: response.data.user };  // Return token and user
        } catch (error) {
            throw error;
        }
    },
    register: async (userData) => {
        try {
            const response = await http.post('/auth/register', userData);
            return response.data;  // this should include token and user details
        } catch (error) {
            throw error;
        }
    }
};

export default authService;
