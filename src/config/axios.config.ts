import axios, { AxiosInstance } from 'axios';
import { toast } from 'sonner';

const apiUrl = `${import.meta.env.VITE_API_URL}/api`;

export const apiClient: AxiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    if (response.data.message) {
      toast.success(response.data.message, {
        position: 'top-right',
      });
    }
    return response;
  },
  (error) => {
    const errorMessage = error.response?.data?.message || 'Ocurrió un error';
    toast.error(`Error: ${errorMessage}`, {
      position: 'top-right',
    });
    return Promise.reject(error);
  }
);
