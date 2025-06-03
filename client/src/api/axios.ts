import axios from "axios";

// const MOCK_URL = "http://localhost:3000";
const API_URL = "http://localhost:6969/api/v1";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  },
  withCredentials: true,
});

// Interceptor để thêm access_token vào header của tất cả các yêu cầu
apiClient.interceptors.request.use((config) => {
  const separator = config.url?.includes("?") ? "&" : "?";
  config.url = `${config.url}${separator}_t=${new Date().getTime()}`;
  return config;
});

// const login = async (id: string, password: string) => {
//   try {
//     const response = await apiClient.post(LOGIN_API, {
//       id,
//       password,
//     });

//     // luu cookie vao session storage
//     const token = response.data.data.access_token;
//     sessionStorage.setItem("access_token", token);
//     apiClient.defaults.headers.Authorization = `Bearer ${token}`;

//     return {
//       user: response.data.data.user,
//       accessToken: response.data.data.access_token,
//     };
//   } catch {
//     throw new Error("Error during login:");
//   }
// };

export { apiClient };
