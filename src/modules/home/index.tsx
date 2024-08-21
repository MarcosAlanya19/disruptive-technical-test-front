/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import clsx from 'clsx';

import { useAuth } from '../../context/auth-context';
import { LoadingSpinner } from '../components/loading-spinner';

const ContentContainer = React.lazy(() => import('./containers/content-container'));
const AuthContainer = React.lazy(() => import('./containers/auth-container'));

export const Home = () => {
  const { isAuthenticated } = useAuth();
  // LoadingSpinner
  return (
    <React.Suspense fallback={<LoadingSpinner />}>
      <div className={clsx('grid bg-slate-200 gap-2 h-screen', !isAuthenticated ? 'grid-cols-1 sm:grid-cols-[400px_1fr]' : 'grid-cols-1')}>
        {!isAuthenticated && <AuthContainer />}
        <div>
          <ContentContainer />
        </div>
      </div>
    </React.Suspense>
  );
};
