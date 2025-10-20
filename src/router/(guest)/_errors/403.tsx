// Routing
import { createFileRoute } from "@tanstack/react-router";

// Components
import Forbidden from "@/features/errors/forbidden";

export const Route = createFileRoute("/(guest)/_errors/403")({
	component: Forbidden,
});
