import React, { useState } from 'react';
import { useAuth } from '../../hooks/AuthContext';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const LoginForm = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const { dispatch } = useAuth();
    const history = useNavigate();

    const handleChange = (evt) => {
        setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        try {
            const { user, token } = await authService.login(credentials);
            dispatch({ type: 'LOGIN', payload: { user, token } });
            history('/')
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" name="username" value={credentials.username} onChange={handleChange} required />
            </label>
            <label>
                Password:
                <input type="password" name="password" value={credentials.password} onChange={handleChange} required />
            </label>
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;