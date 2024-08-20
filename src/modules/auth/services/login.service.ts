import { apiClient } from '../../../config/axios.config';
import { IAuthResponse } from '../types/IAuthResponse';

export interface IloginPayload {
  email: string;
  password: string;
}

interface Ilogin {
  payload: IloginPayload;
}

export const loginRequest = async ({ payload }: Ilogin) => {
  return apiClient.post<IAuthResponse>('/login', { ...payload });
};
