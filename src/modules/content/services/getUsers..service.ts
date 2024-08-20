import { apiClient } from '../../../config/axios.config';
import { IUser } from '../types/IUser.type';

export interface IuserResponse {
  success: boolean;
  message: string;
  data: IUser[];
}

export const getUsers = async () => {
  return apiClient.get<IuserResponse>('/users');
};
