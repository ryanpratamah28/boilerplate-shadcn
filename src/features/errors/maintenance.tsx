// Components
import ErrorComponent from "@/components/features/errors/ErrorComponent";

export default function Maintenance() {
	return (
		<ErrorComponent
			code="503"
			title="Service unavailable"
			description="We’re doing some maintenance or are temporarily overloaded."
			suggestions={[
				"Please try again shortly.",
				"Return to the homepage while we fix this.",
				"Check your connection, then retry.",
			]}
		/>
	);
}
