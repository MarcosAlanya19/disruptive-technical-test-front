import axios, { AxiosInstance } from 'axios';
import { toast } from 'sonner';

const apiUrl = import.meta.env.VITE_API_URL;

console.log(apiUrl);
export const apiClient: AxiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    // Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => {
    console.log(response);
    toast.success(response.data.message || 'Operación exitosa', {
      position: 'top-right',
    });
    return response;
  },
  (error) => {
    const errorMessage = error.response?.data?.message || 'Ocurrió un error';
    const statusCode = error.response?.status || 500;

    toast.error(`${statusCode}: ${errorMessage}`, {
      position: 'top-right',
    });
    return Promise.reject(error);
  }
);
