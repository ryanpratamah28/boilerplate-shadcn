// Components
import ErrorComponent from "@/components/features/errors/ErrorComponent";

export default function Forbidden() {
	return (
		<ErrorComponent
			code="403"
			title="Forbidden"
			description="You don’t have permission to access this page."
			suggestions={[
				"Try a different account with the right access.",
				"Return to the homepage and continue browsing.",
				"If access is required, ask your admin or support.",
			]}
		/>
	);
}
