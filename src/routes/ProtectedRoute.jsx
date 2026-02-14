import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // Check login status
  const isAdminLoggedIn = localStorage.getItem("adminAuth");

  // If not logged in → go to login
  if (!isAdminLoggedIn) {
    return <Navigate to="/admin" replace />;
  }

  // If logged in → open page
  return children;
};

export default ProtectedRoute;
