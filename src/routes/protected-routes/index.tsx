import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/auth-context';

export const ProtectedRoutes: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (!isAuthenticated && !loading) return <Navigate to={'/login'} replace />;

  return <Outlet />;
};
