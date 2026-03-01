// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import authService from "../services/authService";
import type { User, LoginPayload, SignupPayload } from "../types/auth";

interface AuthContextType {
  user: User | null;
  isLoading: boolean; // Add this
  login: (data: LoginPayload) => Promise<void>;
  signup: (data: SignupPayload) => Promise<void>;
  logout: () => void;
  updateUser: (newData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start as true

  useEffect(() => {
    const session = authService.getSession();
    if (session) setUser(session);
    setIsLoading(false); // Stop loading once checked
  }, []);

  const login = async (data: LoginPayload) => {
    const loggedUser = authService.login(data);
    setUser(loggedUser);
  };

  const signup = async (data: SignupPayload) => {
    authService.signup(data);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateUser = (newData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...newData };
      setUser(updatedUser);
      authService.saveSession(updatedUser); 
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}