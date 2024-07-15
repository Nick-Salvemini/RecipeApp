import React, { useState } from 'react';
import { useAuth } from '../../hooks/AuthContext';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import '../../styles/form.css';

const LoginForm = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const { dispatch } = useAuth();
    const history = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (evt) => {
        setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        try {
            const { user, token } = await authService.login(credentials);
            dispatch({ type: 'LOGIN', payload: { user, token } });
            history('/');
        } catch (error) {
            setError('Invalid email or password');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-100 mx-auto mt-5">
            <div className="mb-3 row">
                <label htmlFor="email" className="col-sm-3 col-form-label">Email:</label>
                <div className="col-sm-9">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="password" className="col-sm-3 col-form-label">Password:</label>
                <div className="col-sm-9">
                    <div className="input-group">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                        <div className="input-group-append">
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={togglePasswordVisibility}
                            >
                                <i className={showPassword ? "bi bi-eye" : "bi bi-eye-slash"}></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {error && (
                <div className="mb-3 row">
                    <div className="col-sm-12 text-center text-danger">
                        {error}
                    </div>
                </div>
            )}
            <div className="mb-3 row">
                <div className="col-sm-12 text-center">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>
            </div>
        </form>
    );
};

export default LoginForm;
