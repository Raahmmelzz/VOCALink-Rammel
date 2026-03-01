// src/components/auth/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";

type Props = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const { user, isLoading } = useAuth(); // Grab isLoading

  // 1. Wait for the app to check LocalStorage
  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h3>Loading VocaLink...</h3>
      </div>
    );
  }

  // 2. Now it's safe to check if we should redirect
  if (!user) return <Navigate to="/login" replace />;
  
  return <>{children}</>;
}