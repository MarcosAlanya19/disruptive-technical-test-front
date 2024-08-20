/* eslint-disable react-refresh/only-export-components */
import clsx from 'clsx';
import { useAuth } from '../../context/auth-context';
import { AuthContainer } from './containers/auth-container';
import { ContentContainer } from './containers/content-container';

export const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className={clsx('grid bg-slate-200 gap-2 h-screen', !isAuthenticated && 'grid-cols-[400px_1fr]')}>
      {!isAuthenticated && <AuthContainer />}
      <div>
        <ContentContainer />
      </div>
    </div>
  );
};
