import { apiClient } from '../../../config/axios.config';

export interface IloginPayload {
  email: string;
  password: string;
}

interface Ilogin {
  payload: IloginPayload;
}

export interface IloginResponse {
  success: boolean;
  message: string;
  data: {
    uuid: string;
    username: string;
    email: string;
    createdAt: string,
    updatedAt: string,
  };
}

export const loginRequest = async ({ payload }: Ilogin) => {
  return apiClient.post<IloginResponse>('/login', { ...payload });
};
