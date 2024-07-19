import axios from 'axios';
import config from './config';

// Create an instance of axios with default configuration
const http = axios.create({
    baseURL: config.apiBaseUrl,
    headers: {
        'Content-Type': 'application/json',
    }
});

http.interceptors.request.use(function (config) {
    const token = localStorage.getItem('authToken');

    console.log("Configured API Base URL(http):", config.baseURL);

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

http.interceptors.response.use(response => response, error => {
    if (error.response.status === 401) {
        // Dispatch a custom event for unauthorized access
        window.dispatchEvent(new CustomEvent('unauthorized', { detail: { path: '/login' } }));
        localStorage.removeItem('authToken');
    }
    return Promise.reject(error);
});

export default http;