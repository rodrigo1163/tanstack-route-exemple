import { Link } from "@tanstack/react-router";
import { useAuth } from "@/context/auth-provider";
import { authClient } from "../../lib/auth-client";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { useState } from "react";

const activeProps = {
  className: "font-semibold text-primary",
};

export function Navbar() {
  const { isAuthenticated, session } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function handleSignOut() {
    setIsSigningOut(true);
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            // Usar window.location.href para garantir que o estado seja completamente resetado
            window.location.href = "/sign-in";
          },
          onError: (ctx) => {
            console.error("Erro ao fazer logout:", ctx.error);
            setIsSigningOut(false);
          },
        },
      });
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      setIsSigningOut(false);
    }
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="text-xl font-bold text-primary hover:text-primary/80 transition-colors"
            >
              MyApp
            </Link>

            {/* Navigation Links */}
            {isAuthenticated ? (
              <div className="hidden md:flex items-center gap-6">
                <Link
                  to="/dashboard"
                  activeProps={activeProps}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  inactiveProps={{
                    className:
                      "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
                  }}
                >
                  Dashboard
                </Link>
                <Link
                  to="/to-do"
                  activeProps={activeProps}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  inactiveProps={{
                    className:
                      "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
                  }}
                >
                  To-Do
                </Link>
                {/* <Link
                  to="/search"
                  activeProps={activeProps}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  inactiveProps={{
                    className:
                      "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
                  }}
                >
                  Search
                </Link> */}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-6">
                <Link
                  to="/"
                  activeProps={activeProps}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  inactiveProps={{
                    className:
                      "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
                  }}
                >
                  Home
                </Link>
              </div>
            )}
          </div>

          {/* User Section */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                {/* User Info */}
                <div className="hidden sm:flex items-center gap-3 px-3 py-2 rounded-md bg-accent/50">
                  <div className="flex items-center justify-center size-8 rounded-full bg-primary/10 text-primary">
                    <User className="size-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {session?.user?.name || "Usuário"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {session?.user?.email}
                    </span>
                  </div>
                </div>

                {/* Sign Out Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="gap-2"
                >
                  <LogOut className="size-4" />
                  {isSigningOut ? "Saindo..." : "Sair"}
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/sign-in">
                  <Button variant="ghost" size="sm">
                    Entrar
                  </Button>
                </Link>
                <Link to="/sign-up">
                  <Button size="sm">Cadastrar</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu - Rotas Privadas */}
      {isAuthenticated && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-col gap-2">
              <Link
                to="/dashboard"
                activeProps={activeProps}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                inactiveProps={{
                  className:
                    "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2",
                }}
              >
                Dashboard
              </Link>
              <Link
                to="/to-do"
                activeProps={activeProps}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                inactiveProps={{
                  className:
                    "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2",
                }}
              >
                To-Do
              </Link>
              {/* <Link
                to="/search"
                activeProps={activeProps}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                inactiveProps={{
                  className:
                    "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2",
                }}
              >
                Search
              </Link> */}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
