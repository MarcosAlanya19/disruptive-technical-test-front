import React from 'react';

import { Content } from '../../../content';
import { useContent } from '../../../content/hooks/useContent';
import { useCreateContent } from '../../../content/hooks/useCreateContent';
import { IcontentPayload } from '../../../content/services/createContent.service';
import { Navbar } from '../../../components/navbar';
import { useAuth } from '../../../../context/auth-context';

export const ContentContainer: React.FC = () => {
  const { isAuthenticated } = useAuth();

  const { data: dataContent, handle: getContent, loading: contentLoading } = useContent();
  const { handle: createContent, loading: contentCreateLoading } = useCreateContent();

  const onSubmit = (payload: IcontentPayload) => {
    createContent(payload);
  };

  React.useEffect(() => {
    (async () => {
      await getContent();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log({isAuthenticated})

  return (
    <>
      {isAuthenticated && <Navbar />}
      <Content data={dataContent} isLoading={contentLoading || contentCreateLoading} onSubmit={onSubmit} />
    </>
  );
};
