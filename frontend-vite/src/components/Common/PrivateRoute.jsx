import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';

const PrivateRoute = ({ children }) => {
    const { state } = useAuth();
    let location = useLocation();

    return state.isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;