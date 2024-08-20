import React from 'react';
import { createContent as createContentService, IcontentPayload } from '../services/createContent.service';

export const useCreateContent = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const createContent = React.useCallback(async (payload: IcontentPayload) => {
    setLoading(true);
    setError(null);

    try {
      await createContentService({ payload });
    } catch (err) {
      setError('Failed to create content.');
    } finally {
      setLoading(false);
    }
  }, []);

  return { handle: createContent, loading, error };
};
