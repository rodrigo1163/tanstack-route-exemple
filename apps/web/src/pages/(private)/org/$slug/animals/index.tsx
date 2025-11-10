import { getAnimalsApi } from "@/api/get-animals-api";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/org/$slug/animals/")({
  component: RouteComponent,
  head: () => ({
    meta: [
      {
        title: `Animais da teste`,
      },
    ],
  }),
  loader: async ({ params }) => {
    const animal = await getAnimalsApi({ slug: params.slug });
    return { animal };
  },
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: () => <div>Error</div>,
  notFoundComponent: () => <div>Not Found</div>,
});

function RouteComponent() {
  const { animal } = Route.useLoaderData();
  return <div>{animal.name}</div>;
}
