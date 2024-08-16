import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  console.log("ISAUTHENTICATED!@#", isAuthenticated)
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/LoginPage" state={{ from: location }} />;
  }

  return element;
};

export default ProtectedRoute;
