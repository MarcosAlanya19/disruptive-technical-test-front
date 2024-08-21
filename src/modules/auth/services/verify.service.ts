import { apiClient } from '../../../config/axios.config';

export interface IverifyResponse {
  success: boolean;
  message: string;
  data: {
    uuid: string,
    username: string,
    email: string,
    credits: number
  },
}

export const verifyRequest = async () => {
  return apiClient.get<IverifyResponse>('/verify');
};
