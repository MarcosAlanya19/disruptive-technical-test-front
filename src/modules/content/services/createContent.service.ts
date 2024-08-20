import { apiClient } from '../../../config/axios.config';

enum EContentType {
  IMAGE = 'Image',
  VIDEO = 'Video',
  TEXT = 'Text',
}

export interface IcontentPayload {
  title: string;
  type: EContentType;
  textContent?: string;
  url?: string;
  credits: string;
}

interface Icontent {
  payload: IcontentPayload;
}

export const createContent = async ({ payload }: Icontent) => {
  return apiClient.post<void>('/contents', { ...payload });
};
