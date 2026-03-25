import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:8080/api/v1", // Ana URL
});

// İSTEK GİTMEDEN ÖNCE (Request Interceptor)
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// CEVAP GELDİĞİNDE (Response Interceptor)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token geçersizse veya süresi dolduysa kullanıcıyı logine at
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;