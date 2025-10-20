import { createFileRoute } from "@tanstack/react-router";

import Homepage from "@/features/apps";

export const Route = createFileRoute("/(guest)/_guest/")({
	component: RouteComponent,
});

function RouteComponent() {
	return <Homepage />;
}
