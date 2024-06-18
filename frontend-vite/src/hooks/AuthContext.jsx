import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Define the context
const AuthContext = createContext();

// Initial state
const initialState = {
    isAuthenticated: false,
    user: null,
    token: localStorage.getItem('authToken')
};

// Reducer function to handle actions
function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
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
        default:
            return state;
    }
}

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    //const history = useNavigate();

    useEffect(() => {
        const path = state.isAuthenticated ? '/home' : '/login';
        // history(path);
    }, [state.isAuthenticated]);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);