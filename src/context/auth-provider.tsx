import { createContext, useContext, type ReactNode } from "react";

export interface AuthContextType {
  isAuthenticated: boolean;
}
interface AuthProvider {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthProvider) {
  const isAuthenticated = true
  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}