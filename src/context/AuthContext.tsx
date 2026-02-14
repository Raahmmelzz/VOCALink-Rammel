import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

import authService from "../services/authService";
import type { User, LoginPayload, SignupPayload } from "../types/auth";

interface AuthContextType {
  user: User | null;
  login: (data: LoginPayload) => Promise<void>;
  signup: (data: SignupPayload) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const session = authService.getSession();
    if (session) setUser(session);
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

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}