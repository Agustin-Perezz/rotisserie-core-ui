import axios from 'axios';
import { getAccessToken } from './services/auth';
import { errorToast } from './alerts/toast';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await getAccessToken();

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    } catch (error) {
      console.error('Error adding auth token to request:', error);
      return config;
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred';
    errorToast(errorMessage);
    return Promise.reject(error);
  }
);

export default api;
