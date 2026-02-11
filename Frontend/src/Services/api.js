import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000', // backend server port
    withCredentials: true
});

api.interceptors.request.use((response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        // if error is 401
        if(error.response.status ===401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await axios.get('http://localhost:4000/refresh',{withCredentials: true})
                return api(originalRequest)
            } catch (refreshError) {
                window.location.href('/login')
                return Promise.reject(refreshError)
            }
        }
        return Promise.reject(error)
    }
)


// // this interceptor automatically add jwt to every requests
// api.interceptors.request.use((config) => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     if(user && user.token) {
//         config.headers.Authorization = user.token;
//     }
//     return config;
// })

export default api;