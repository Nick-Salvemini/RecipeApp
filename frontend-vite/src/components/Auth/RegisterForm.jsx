import React, { useState } from 'react';
import { AuthProvider, useAuth } from '../../hooks/AuthContext';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const RegisterForm = () => {
    const [userData, setUserData] = useState({ username: '', password: '', email: '' });
    const { dispatch } = useAuth();
    const history = useNavigate();

    const handleChange = (evt) => {
        setUserData({ ...userData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        try {
            const { user, token } = await authService.register(userData);
            console.log('Registered user:', user);
            dispatch({ type: 'LOGIN', payload: { user, token } });
            history('/')
        } catch (error) {
            console.error('Registration failed:', error);
            alert('Registration failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" name="username" value={userData.username} onChange={handleChange} required />
            </label>
            <label>
                Password:
                <input type="password" name="password" value={userData.password} onChange={handleChange} required />
            </label>
            <label>
                Email:
                <input type="email" name="email" value={userData.email} onChange={handleChange} required />
            </label>
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterForm;