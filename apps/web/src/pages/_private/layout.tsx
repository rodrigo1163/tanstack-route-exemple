import { Navbar } from "@/components/navbar";
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
      {/* <Navbar /> */}
      <Outlet />
    </div>
  );
}
