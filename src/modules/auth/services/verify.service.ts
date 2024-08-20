import { apiClient } from '../../../config/axios.config';

export interface IverifyResponse {
  success: boolean;
  message: string;
  data: {
    uuid: string,
    username: string,
    email: string,
  },
}

export const verifyRequest = async () => {
  return apiClient.get<IverifyResponse>('/verify');
};
