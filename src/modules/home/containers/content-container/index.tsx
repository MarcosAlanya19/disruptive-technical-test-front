import React from 'react';

import { Content } from '../../../content';
import { useContents } from '../../../content/hooks/useContents';
import { useCreateContent } from '../../../content/hooks/useCreateContent';
import { IcontentPayload } from '../../../content/services/createContent.service';
import { Navbar } from '../../../components/navbar';
import { useAuth } from '../../../../context/auth-context';
import { IcontentQueryParams } from '../../../content/services/getContent.service';

export const ContentContainer: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const { data: dataContent, handle: getContent, loading: contentLoading } = useContents();
  const { handle: createContent, loading: contentCreateLoading } = useCreateContent();

  const onSubmit = (payload: IcontentPayload): Promise<void> => {
    return createContent(payload);
  };

  const [filters, setFilters] = React.useState<IcontentQueryParams>({
    category: '',
    name: '',
    theme: '',
  });

  React.useEffect(() => {
    const filteredFilters: IcontentQueryParams = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(filters).filter(([_, value]) => value !== '')
    ) as IcontentQueryParams;

    (async () => {
      await getContent(filteredFilters);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);
  return (
    <>
      {isAuthenticated && <Navbar />}
      <Content data={dataContent} isLoading={contentLoading || contentCreateLoading} onSubmit={onSubmit} refreshContent={getContent} onChangeFilters={setFilters} />
    </>
  );
};
