import axios from 'axios';
import { AUTH_TOKEN_KEY } from '../utils';

const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) {
    console.error('VITE_API_URL is not defined. Using default http://localhost:3000');
}

const api = axios.create({
    baseURL: API_URL || 'http://localhost:3000',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
})

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem(AUTH_TOKEN_KEY);
            window.location.href = '/auth/login';
        }
        return Promise.reject(error);
    }
);

export default api;

