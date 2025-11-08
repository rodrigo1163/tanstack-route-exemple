import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_private")({
  beforeLoad: async ({ context }) => {
    const { isAuthenticated } = context.auth;
    if (!isAuthenticated) {
      throw redirect({ to: "/sign-in" });
    }
  },
  component: PrivateRoute,
});

function PrivateRoute() {
  return (
    <div>
      <h1>Private Route</h1>
      <Outlet />
    </div>
  );
}
