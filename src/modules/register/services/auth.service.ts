import { apiClient } from '../../../config/axios.config';

export interface IregisterPayload {
  email: string;
  password: string;
  username: string;
}

interface Iregister {
  payload: IregisterPayload;
}

export interface IregisterResponse {
  success: boolean;
  message: string;
  data: {
    uuid: string;
    username: string;
    email: string;
  };
}

export const registerRequest = async ({ payload }: Iregister) => {
  return apiClient.post<IregisterResponse>('/register', { ...payload });
};
