// Routing
// import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";

// Components
import NotFound from "@/features/errors/not-found";
import ServerError from "@/features/errors/server-error";

const RootComponent = () => {
	return (
		<>
			<Outlet />

			{/* {import.meta.env.MODE === "development" && (
				<TanStackRouterDevtools />
			)} */}
		</>
	);
};

export const Route = createRootRoute({
	component: RootComponent,
	notFoundComponent: NotFound,
	errorComponent: ServerError,
});
