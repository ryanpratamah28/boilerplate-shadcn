// Routing
import { createFileRoute } from "@tanstack/react-router";

// Components
import Login from "@/features/auth/login";

export const Route = createFileRoute("/(guest)/_auth/login")({
	component: RouteComponent,
});

function RouteComponent() {
	return <Login />;
}
