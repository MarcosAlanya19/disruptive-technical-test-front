import { apiClient } from '../../../config/axios.config';

export interface IcontentSimpleResponse {
  success: boolean;
  message: string;
  data: {
    name: string;
    uuid: string;
  }[];
}

export const getContentsNames = async () => {
  return apiClient.get<IcontentSimpleResponse>('/contents/simple');
};
