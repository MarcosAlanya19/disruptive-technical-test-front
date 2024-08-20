import React from 'react';
import { getContent, IcontentQueryParams } from '../services/getContent.service';
import { IContent } from '../types/IContent.type';

export const useContents = () => {
  const [data, setData] = React.useState<IContent[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const fetchData = async (params?: IcontentQueryParams) => {
    setLoading(true);
    setError(null);

    try {
      const response = await getContent(params);
      if (response?.data?.success) {
        setData(response?.data?.data);
      } else {
        setError(response?.data?.message);
      }
    } catch (err) {
      setError('An error occurred while fetching content.');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, handle: fetchData };
};
