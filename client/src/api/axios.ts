import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:6969/api/v1",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
    },
});

// Add a request interceptor
instance.interceptors.request.use(
    (config) => {
        // Add cache control headers to every request
        config.headers["Cache-Control"] = "no-cache, no-store, must-revalidate";
        config.headers["Pragma"] = "no-cache";
        config.headers["Expires"] = "0";
        
        // Get token from localStorage
        const token = localStorage.getItem('authToken');
        if (token) {
            // Add token to Authorization header
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        
        // Browser automatically sends HttpOnly cookies
        // No need to manually add Authorization header if using cookies for auth
        
        // Log request details for debugging
        console.log('Request:', {
            url: config.url,
            method: config.method,
            headers: config.headers,
            withCredentials: config.withCredentials
        });
        
        return config;
    },
    (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    (response) => {
        // Log response details for debugging
        console.log('Response:', {
            status: response.status,
            headers: response.headers,
            data: response.data
        });
        return response;
    },
    async (error) => {
        // Log error details for debugging
        console.error('Response error:', {
            status: error.response?.status,
            data: error.response?.data,
            headers: error.response?.headers
        });
        
        // Remove automatic redirect on 401
        return Promise.reject(error);
    }
);

export default instance;