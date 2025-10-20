// Routing
import { createFileRoute, Outlet } from "@tanstack/react-router";

// Components
import ProtectedRoutes from "@/components/ProtectedRoutes";
import NotFound from "@/features/errors/not-found";
import AuthLayout from "@/components/layouts/AuthLayout";
import ServerError from "@/features/errors/server-error";

export const Route = createFileRoute("/(guest)/_auth")({
	component: () => (
		<ProtectedRoutes allowGuest redirectIfAuth>
			<AuthLayout>
				<Outlet />
			</AuthLayout>
		</ProtectedRoutes>
	),
	notFoundComponent: NotFound,
	errorComponent: ServerError,
});
