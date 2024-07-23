import axios from 'axios';

const getToken = () => {
    return localStorage.getItem('token');
};

const api = axios.create({
    baseURL: 'https://127.0.0.1:5000/api', // Adjust the base URL as needed
    withCredentials: true, // Ensure credentials are sent
});

let csrfToken = null;

api.interceptors.request.use(
    async (config) => {
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        // Fetch CSRF token if it's a state-changing request
        if (['post', 'put', 'delete'].includes(config.method)) {
            if (!csrfToken) {
                const response = await axios.get('https://127.0.0.1:5000/api/csrf-token', { withCredentials: true });
                csrfToken = response.data.csrfToken;
            }
            config.headers['X-CSRF-Token'] = csrfToken;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
