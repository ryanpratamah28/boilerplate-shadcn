// Routing
import { createFileRoute } from "@tanstack/react-router";

// Components
import Maintenance from "@/features/errors/maintenance";

export const Route = createFileRoute("/(guest)/_errors/503")({
	component: Maintenance,
});
