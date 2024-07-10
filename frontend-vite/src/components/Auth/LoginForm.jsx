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
            console.log('Logged in user:', user);
            dispatch({ type: 'LOGIN', payload: { user, token } });
            history('/')
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-100 mx-auto mt-5">
            <div className="mb-3 row">
                <label htmlFor="username" className="col-sm-3 col-form-label">Username:</label>
                <div className="col-sm-9">
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="password" className="col-sm-3 col-form-label">Password:</label>
                <div className="col-sm-9">
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
            </div>
            <div className="mb-3 row">
                <div className="col-sm-12 text-center">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </div>
        </form>
    );
};

export default LoginForm;
