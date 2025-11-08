import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import "./global.css";
import reportWebVitals from "./reportWebVitals.ts";
import { NotFound } from "./components/404.tsx";
import { useAuth } from "./context/auth-provider.tsx";
import { Provider } from "./providers/provider.tsx";

// Create a new router instance
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

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

function InnerApp() {
	const auth = useAuth();

	if (auth.isLoading) {
		return (
			<div className="flex h-screen w-full items-center justify-center p-4">
				<div className="size-10 rounded-full border-4 border-gray-200 border-t-foreground animate-spin" />
			</div>
		);
	}

	if (auth.error) {
		return <div>Error: {auth.error.message}</div>;
	}

	return <RouterProvider router={router} context={{ auth }} />;
}

// Render the app
const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<Provider>
				<InnerApp />
			</Provider>
		</StrictMode>,
	);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
