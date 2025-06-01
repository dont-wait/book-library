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
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response?.status === 401) {
            // If unauthorized, redirect to login
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default instance;