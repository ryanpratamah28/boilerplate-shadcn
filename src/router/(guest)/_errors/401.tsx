// Routing
import { createFileRoute } from "@tanstack/react-router";

// Components
import Unauthorized from "@/features/errors/unauthorized";

export const Route = createFileRoute("/(guest)/_errors/401")({
	component: Unauthorized,
});
