import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_public")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>Public Route</h1>
      <Outlet />
    </div>
  );
}
