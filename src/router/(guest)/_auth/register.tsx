// Routing
import { createFileRoute } from "@tanstack/react-router";

// Components
import RegisterComponent from "@/features/auth/register";

export const Route = createFileRoute("/(guest)/_auth/register")({
	component: RouteComponent,
});

function RouteComponent() {
	return <RegisterComponent />;
}
