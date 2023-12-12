import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthRoute2 = ({ isAuthenticated, element }) => {
  // Convert the string "true" to a boolean true
  const isUserAuthenticated = isAuthenticated === true || isAuthenticated === 'true';

  if (isUserAuthenticated) {
    return element;
  } else {
    return <Navigate to="/" />;
  }
};

export default AuthRoute2;