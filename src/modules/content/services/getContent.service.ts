import { apiClient } from '../../../config/axios.config';
import { IContent } from '../types/IContent.type';

export interface IcontentQueryParams {
  category?: string;
  theme?: string;
  name?: string;
}

export interface IcontentResponse {
  success: boolean;
  message: string;
  data: IContent[];
}

export const getContent = async (params?: IcontentQueryParams) => {
  return apiClient.get<IcontentResponse>('/contents', { params });
};
