import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated, removeToken } from "../utils/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const authenticated = isAuthenticated();

  useEffect(() => {
    if (!authenticated) {
      removeToken(); // Cleanup expired or invalid token
    }
  }, [authenticated]);

  // ✅ Optional: Use a loading state if token verification is async
  // For now, your check is synchronous, so it's fine.

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
