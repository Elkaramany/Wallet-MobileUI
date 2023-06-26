import axios from 'axios'
import { BASE_URL } from '@env'

const api = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use(
    config => {
        return { ...config, headers: config.headers };
    },
    error => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    response => response,
    error => {
        return Promise.reject(error);
    }
);

export const setToken = token => {
    api.defaults.headers["Authorization"] = `JWT ${token}`;
    api.tokens = token;
};

export const removeToken = () => {
    delete api.defaults.headers["Authorization"];
    delete api.tokens;
};

export const getToken = () => api.defaults.headers["Authorization"] || null;

export const setHeaders = headers =>
    (api.defaults.headers = { ...api.defaults.headers, ...headers });

export default api;
