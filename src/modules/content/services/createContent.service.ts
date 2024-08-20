import { apiClient } from '../../../config/axios.config';

export interface IcontentPayload {
  title: string;
  textContent?: string;
  url?: string;
  categoryId: string;
  themeId: string;
}

export interface Icontent {
  payload: IcontentPayload;
}

export const createContent = async ({ payload }: Icontent) => {
  return apiClient.post<void>('/contents', { ...payload });
};
