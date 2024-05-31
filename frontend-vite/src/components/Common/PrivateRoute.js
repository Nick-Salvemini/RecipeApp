import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '../../hooks/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { state } = useAuth();

    return (
        <Route
            {...rest}
            render={props =>
                state.isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Navigate to="/login" />
                )
            }
        />
    );
};

export default PrivateRoute;