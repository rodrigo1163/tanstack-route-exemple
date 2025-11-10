import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/(private)/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_private/settings"!</div>;
}
