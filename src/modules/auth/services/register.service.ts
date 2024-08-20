import { apiClient } from '../../../config/axios.config';

export enum ERoleUser {
  READER = 'Reader',
  CREATOR = 'Creator',
  ADMIN = 'Admin',
}

export interface IregisterPayload {
  email: string;
  password: string;
  username: string;
  role: ERoleUser;
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
    role: ERoleUser
  };
}

export const registerRequest = async ({ payload }: Iregister) => {
  return apiClient.post<IregisterResponse>('/register', { ...payload });
};
