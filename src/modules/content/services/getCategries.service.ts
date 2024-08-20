import { apiClient } from '../../../config/axios.config';
import { ICategory } from '../types/ICategory.type';

export interface IcategoryResponse {
  success: boolean;
  message: string;
  data: ICategory[];
}

export const getCategories = async () => {
  return apiClient.get<IcategoryResponse>('/categories');
};
