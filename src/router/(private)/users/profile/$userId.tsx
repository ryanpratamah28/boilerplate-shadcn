// Routing
import { createFileRoute } from "@tanstack/react-router";
import ProtectedRoutes from "@/components/ProtectedRoutes";

// Components
import RootLayout from "@/components/layouts/RootLayout";
import Profile from "@/features/users/profile";

// Types & Enums
import { PERMISSIONS } from "@/lib/enum/roles";

export const Route = createFileRoute("/(private)/users/profile/$userId")({
	component: () => (
		<ProtectedRoutes permission={[PERMISSIONS.VIEW_PROFILE]}>
			<RootLayout>
				<RouteComponent />
			</RootLayout>
		</ProtectedRoutes>
	),
});

function RouteComponent() {
	return <Profile />;
}
