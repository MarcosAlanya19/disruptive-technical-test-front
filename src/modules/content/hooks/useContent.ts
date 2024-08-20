import { useCallback, useState } from 'react';
import { apiClient } from '../../../config/axios.config';
import { IContent } from '../types/IContent.type';

export interface IContentResponse {
  success: boolean;
  message: string;
  data: IContent[];
}

export const useContent = () => {
  const [data, setData] = useState<IContent[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get<IContentResponse>('/contents');
      if (response.data.success) {
        setData(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('An error occurred while fetching content.');
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, handle: fetchData };
};
