import { useState } from 'react';
import { IUser } from '../types/IUser.type';
import { getThemes } from '../services/getThemes.service';

export const useThemes = () => {
  const [data, setData] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getThemes();
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
