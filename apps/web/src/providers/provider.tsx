import { AuthProvider } from "@/context/auth-provider";

interface ProviderProps {
  children: React.ReactNode
}

export function Provider({ children }: ProviderProps) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}