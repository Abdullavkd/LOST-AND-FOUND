import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000' // backend server port
});

// this interceptor automatically add jwt to every requests
api.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user && user.token) {
        config.headers.Authorization = user.token;
    }
    return config;
})

export default api;