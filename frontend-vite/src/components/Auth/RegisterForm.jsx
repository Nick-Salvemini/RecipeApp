import React, { useState } from 'react';
import { useAuth } from '../../hooks/AuthContext';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';
import '../../styles/form.css';

const RegisterForm = () => {
    const [userData, setUserData] = useState({ password: '', confirmPassword: '', email: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const { dispatch } = useAuth();
    const history = useNavigate();

    const handleChange = (evt) => {
        setUserData({ ...userData, [evt.target.name]: evt.target.value });
    };

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        const newErrors = {};

        if (userData.password !== userData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const { user, token } = await authService.register({
                email: userData.email,
                password: userData.password,
            });

            localStorage.setItem('authToken', token);

            dispatch({ type: 'LOGIN', payload: { user, token } });
            history('/');
        } catch (error) {
            setErrors({ email: 'Registration failed' });
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
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
                        value={userData.email}
                        onChange={handleChange}
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        required
                    />
                    {errors.email && (
                        <div className="invalid-feedback">
                            {errors.email}
                        </div>
                    )}
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
                            value={userData.password}
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
            <div className="mb-3 row">
                <label htmlFor="confirmPassword" className="col-sm-3 col-form-label">Confirm Password:</label>
                <div className="col-sm-9">
                    <div className="input-group">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={userData.confirmPassword}
                            onChange={handleChange}
                            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                            required
                        />
                        <div className="input-group-append">
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                <i className={showConfirmPassword ? "bi bi-eye" : "bi bi-eye-slash"}></i>
                            </button>
                        </div>
                    </div>
                    {errors.confirmPassword && (
                        <div className="invalid-feedback">
                            {errors.confirmPassword}
                        </div>
                    )}
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
