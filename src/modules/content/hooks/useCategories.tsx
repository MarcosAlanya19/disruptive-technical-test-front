import { useState } from 'react';
import { getCategories } from '../services/getCategries.service';
import { ICategory } from '../types/ICategory.type';

export const useCategories = () => {
  const [data, setData] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getCategories();
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
