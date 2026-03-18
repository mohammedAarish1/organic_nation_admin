import axios from "axios";
import { getStore as store } from "../helper/storeUtils";
// import { logout } from "../features/auth/auth";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
    baseURL: apiUrl,
    withCredentials: true, // Important for cookies
  });
  
  // Axios interceptor for handling token refresh
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        try {
          // const response = await api.post(`/api/auth/user/refresh`);
          const response = await axios.post(`${apiUrl}/api/auth/user/refresh`, {}, { withCredentials: true })
          const { accessToken } = response.data;
  
          // Update access token in axios headers
          api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
  
          return api(originalRequest);
        } catch (refreshError) {
          // Handle refresh token failure (logout user)
          store.dispatch(logout());
          return Promise.reject(refreshError);
        }
      }
  
      return Promise.reject(error);
    }
  );

  export default api;