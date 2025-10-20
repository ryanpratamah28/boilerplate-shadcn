// Routing
import { createFileRoute, Outlet } from "@tanstack/react-router";

// Components
import ProtectedRoutes from "@/components/ProtectedRoutes";
import ErrorLayout from "@/components/layouts/ErrorLayout";
import NotFound from "@/features/errors/not-found";
import ServerError from "@/features/errors/server-error";

export const Route = createFileRoute("/(guest)/_errors")({
	component: () => (
		<ProtectedRoutes allowGuest>
			<ErrorLayout>
				<Outlet />
			</ErrorLayout>
		</ProtectedRoutes>
	),
	notFoundComponent: NotFound,
	errorComponent: ServerError,
});
