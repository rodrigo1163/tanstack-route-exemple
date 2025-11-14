import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen.ts";

import "./global.css";
import reportWebVitals from "./reportWebVitals.ts";
import { NotFound } from "./components/404.tsx";
import { useAuth } from "./app/providers/auth-provider.tsx";
import { Providers } from "./app/providers/index.tsx";
import { SplashScreen } from "./components/splash-screen.tsx";
import { useSplashScreen } from "./hooks/use-splash-screen.ts";

const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
  defaultPreload: "intent",
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
  defaultNotFoundComponent: NotFound,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const auth = useAuth();
  const { showSplash, visible } = useSplashScreen(auth.isLoading);

  if (showSplash) return <SplashScreen visible={visible} />;

  if (auth.error) {
    throw auth.error;
  }

  return <RouterProvider router={router} context={{ auth }} />;
}

const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <Providers>
        <InnerApp />
      </Providers>
    </StrictMode>
  );
}

reportWebVitals();
