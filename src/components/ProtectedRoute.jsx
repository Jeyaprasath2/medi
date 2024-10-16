import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getAuthUser } from '../utils/localStorageUtils';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = !!getAuthUser();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;