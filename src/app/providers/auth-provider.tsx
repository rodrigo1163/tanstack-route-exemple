import { useGetSession } from "@/hooks/auth/use-get-session";
import type { BetterFetchError } from "better-auth/react";
import { createContext, useContext, type ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

export interface Session {
  id: string;
  userId: string;
  expiresAt: Date;
  token: string;
}
export interface Data {
  user: User;
  session: Session;
}
export interface AuthContextType {
  isAuthenticated: boolean;
  session: Data | null;
  isLoading: boolean;
  error: BetterFetchError | null;
}
interface AuthProvider {
  children: ReactNode;
}

const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProvider) {
  const { data, isPending, error } = useGetSession();
  const isAuthenticated = !!data;

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, session: data, isLoading: isPending, error }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
