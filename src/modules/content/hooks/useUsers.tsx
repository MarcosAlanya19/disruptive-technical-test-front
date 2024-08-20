import { useState } from 'react';
import { getUsers } from '../services/getUsers..service';
import { IUser } from '../types/IUser.type';

export const useUsers = () => {
  const [data, setData] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getUsers();
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
