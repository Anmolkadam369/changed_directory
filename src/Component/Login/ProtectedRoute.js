import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element ,requiredRole}) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isSimilarRole = useSelector((state) => state.auth.role);

  console.log("ISAUTHENTICATED!@#", isAuthenticated)
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/LoginPage" state={{ from: location }} />;
  }

  // if (isSimilarRole !== requiredRole) {
  //   return <Navigate to="/NotAuthorized" />; // Redirect unauthorized users
  // }
  return element;
};

export default ProtectedRoute;
