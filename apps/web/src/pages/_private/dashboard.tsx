import { useAuth } from "@/context/auth-provider";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_private/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const { auth: { isAuthenticated}} = Route.useRouteContext()
  return <div>Hello "/dashboard"! {isAuthenticated ? "Authenticated kk" : "Not authenticated"}</div>;
}
