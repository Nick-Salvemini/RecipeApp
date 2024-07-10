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
        <form onSubmit={handleSubmit} className="w-100 mx-auto mt-5">
            <div className="mb-3 row">
                <label htmlFor="username" className="col-sm-3 col-form-label">Username:</label>
                <div className="col-sm-9">
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={userData.username}
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
                        value={userData.password}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="email" className="col-sm-3 col-form-label">Email:</label>
                <div className="col-sm-9">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
            </div>
            <div className="mb-3 row">
                <div className="col-sm-12 text-center">
                    <button type="submit" className="btn btn-primary">Register</button>
                </div>
            </div>
        </form>
    );
};

export default RegisterForm;