// Routing
import { createFileRoute } from "@tanstack/react-router";

// Components
import NotFound from "@/features/errors/not-found";

export const Route = createFileRoute("/(guest)/_errors/404")({
	component: NotFound,
});
