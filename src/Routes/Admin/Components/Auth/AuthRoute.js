import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRoute = ({ isAuthenticated, element }) => {
  if (isAuthenticated) {
    return element;
  } else {
    // Redirect to login or handle unauthorized access
    return <Navigate to="/Admin" />;
  }
};

export default AuthRoute;