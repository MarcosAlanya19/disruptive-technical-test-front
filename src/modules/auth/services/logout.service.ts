import { apiClient } from '../../../config/axios.config';

export interface IlogoutResponse {
  success: boolean;
  message: string;
  data: {
    uuid: string;
    username: string;
    email: string;
  };
}

export const logoutRequest = async () => {
  return apiClient.post<IlogoutResponse>('/logout');
};
