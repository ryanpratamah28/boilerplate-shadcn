// Routing
import { createFileRoute, Outlet } from "@tanstack/react-router";

// Components
import NotFound from "@/features/errors/not-found";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import ServerError from "@/features/errors/server-error";
import ProtectedRoutes from "@/components/ProtectedRoutes";

// Enums
import { PERMISSIONS } from "@/lib/enum/roles";

export const Route = createFileRoute("/(dashboard)/admin")({
	component: RouteComponent,
	notFoundComponent: NotFound,
	errorComponent: ServerError,
});

function RouteComponent() {
	return (
		<ProtectedRoutes permission={[PERMISSIONS.VIEW_DASHBOARD]}>
			<DashboardLayout>
				<Outlet />
			</DashboardLayout>
		</ProtectedRoutes>
	);
}
