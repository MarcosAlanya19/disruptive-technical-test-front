import { apiClient } from '../../../config/axios.config';
import { IContent } from '../types/IContent.type';

export interface IcontentResponse {
  success: boolean;
  message: string;
  data: IContent
}

export const getContent = async () => {
  return apiClient.get<IcontentResponse>('/contents');
};
