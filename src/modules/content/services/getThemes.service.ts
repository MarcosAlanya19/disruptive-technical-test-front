import { apiClient } from '../../../config/axios.config';
import { ITheme } from '../types/ITheme.type';

export interface IthemeResponse {
  success: boolean;
  message: string;
  data: ITheme[];
}

export const getThemes = async () => {
  return apiClient.get<IthemeResponse>('/themes');
};
