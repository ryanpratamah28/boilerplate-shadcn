// Routing
import { createFileRoute, Outlet } from "@tanstack/react-router";

// Components
import RootLayout from "@/components/layouts/RootLayout";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import NotFound from "@/features/errors/not-found";
import ServerError from "@/features/errors/server-error";

export const Route = createFileRoute("/(guest)/_guest")({
	component: () => (
		<ProtectedRoutes allowGuest>
			<RootLayout>
				<Outlet />
			</RootLayout>
		</ProtectedRoutes>
	),
	notFoundComponent: NotFound,
	errorComponent: ServerError,
});
