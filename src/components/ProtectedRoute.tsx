"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, removeToken } from "../utils/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState<boolean | null>(null);

  useEffect(() => {
    const authStatus = isAuthenticated();
    setIsAuth(authStatus);

    if (!authStatus) {
      removeToken();
      router.push("/login");
    }
  }, [router]);

  if (isAuth === null) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>; // Loading state
  }

  if (!isAuth) {
    return null; // Navigation is handled in useEffect
  }

  return <>{children}</>;
};

export default ProtectedRoute;
