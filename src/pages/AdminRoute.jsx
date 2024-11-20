import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../store/Auth';
import AdminDashboard from './Admin/AdminDashboard';

const AdminRoute = () => {
  const { user, isLoggedIn, AuthorizationToken } = useAuth();

  // Check if the user is logged in and is an admin
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    // Optionally, show a loading indicator here
    return <div>Loading...</div>;
  }

  if (!user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  // If the user is an admin, render the AdminDashboard component
  return <AdminDashboard />;
};

export default AdminRoute;
