import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Define the context
const AuthContext = createContext();

// Initial state
const initialState = {
    isAuthenticated: false,
    user: null,
    // token: localStorage.getItem('authToken')
    token: localStorage.getItem('authToken') || null
};

// Reducer function to handle actions
function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            console.log('User logged in:', action.payload.user);
            localStorage.setItem('authToken', action.payload.token);
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload.user,
                token: action.payload.token
            };
        case 'LOGOUT':
            localStorage.removeItem('authToken');
            return {
                ...state,
                isAuthenticated: false,
                user: null,
                token: null
            };
    }
}

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    // useEffect(() => {
    //     const path = state.isAuthenticated ? '/home' : '/login';
    // }, [state.isAuthenticated]);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            axios.get('/auth/me', {
                headers: { Authorization: `Bearer ${token}` }
            }).then(response => {
                dispatch({ type: 'LOGIN', payload: { user: response.data.user, token } });
            }).catch(() => {
                dispatch({ type: 'LOGOUT' });
            });
        }
    }, []);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);