import { apiClient } from '../../../config/axios.config';
import { IAuthResponse } from '../types/IAuthResponse';

export enum ERoleUser {
  READER = 'Reader',
  CREATOR = 'Creator',
  ADMIN = 'Admin',
}

export interface IregisterPayload {
  email: string;
  password: string;
  username: string;
  role: ERoleUser | undefined;
}

interface Iregister {
  payload: IregisterPayload;
}

export const registerRequest = async ({ payload }: Iregister) => {
  return apiClient.post<IAuthResponse>('/register', { ...payload });
};
