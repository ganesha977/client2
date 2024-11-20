import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../store/Auth';

const UserRoute = () => {
  const { user, isLoggedIn } = useAuth();

  // Check if the user is logged in
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    // Optionally, show a loading indicator here
    return <div>Loading...</div>;
  }

  // If the user is logged in, render the nested routes
  return <Outlet />;
};

export default UserRoute;
