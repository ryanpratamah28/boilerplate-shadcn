// Components
import ErrorComponent from "@/components/features/errors/ErrorComponent";

export default function ServerError() {
	return (
		<ErrorComponent
			code="500"
			title="Something went wrong"
			description="That’s on us. An unexpected error occurred."
			suggestions={[
				"Try refreshing the page.",
				"Come back in a moment.",
				"If the problem continues, contact support.",
			]}
		/>
	);
}
