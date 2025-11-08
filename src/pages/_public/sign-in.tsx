import { isAuthenticated, signIn, signOut } from "@/utils/auth";
import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/sign-in")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { auth: { isAuthenticated}} = Route.useRouteContext()
  return (
    <>
      <h2>Login</h2>
      {isAuthenticated ? (
        <>
          <p>Hello user!</p>
          <button
            onClick={async () => {
              signOut();
              router.invalidate();
            }}
          >
            Sign out
          </button>
        </>
      ) : (
        <button
          onClick={async () => {
            signIn();
            router.invalidate();
          }}
        >
          Sign in
        </button>
      )}
    </>
  );
}
