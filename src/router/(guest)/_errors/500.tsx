// Routing
import { createFileRoute } from "@tanstack/react-router";

// Components
import ServerError from "@/features/errors/server-error";

export const Route = createFileRoute("/(guest)/_errors/500")({
	component: ServerError,
});
