import axios from "axios";

const apiUrl = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type' : 'application/json',
    },    
});

apiUrl.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');

        if(token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
        }
         return config;
    }, ( error ) => {
        return Promise.reject(error);
    }
);

export default apiUrl;