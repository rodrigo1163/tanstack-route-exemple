import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/_private/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_private/settings"!</div>;
}
