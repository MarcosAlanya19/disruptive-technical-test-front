import { useState } from 'react';
import { getContentsNames } from '../services/getContentNames.service';

export const useContentsSimple = () => {
  const [data, setData] = useState<{ name: string; uuid: string }[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getContentsNames();
      if (response.data.success) {
        setData(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('An error occurred while fetching user.');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, handle: fetchData };
};
