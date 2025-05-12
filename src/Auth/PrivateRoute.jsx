import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-center py-10">Loading session...</div>;
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
