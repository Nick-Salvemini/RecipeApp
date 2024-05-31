import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GlobalErrorHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleUnauthorized = (event) => {
            navigate(event.detail.path);
        };

        window.addEventListener('unauthorized', handleUnauthorized);

        return () => {
            window.removeEventListener('unauthorized', handleUnauthorized);
        };
    }, [navigate]);

    return null;
};

export default GlobalErrorHandler;