import axios from 'axios';

const getAuthCookie = () => {
    const cookies = document.cookie.split(';');
    const authCookie = cookies.find(cookie => cookie.includes('td-auth-token'));
    const token = authCookie?.split('=')[1];

    return token;
}

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
})

axiosInstance.interceptors.request.use(
    (config) => {
        const token = getAuthCookie();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
);

export { axiosInstance as http }
