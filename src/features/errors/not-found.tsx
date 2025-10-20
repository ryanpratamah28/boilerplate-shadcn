// Components
import ErrorComponent from "@/components/features/errors/ErrorComponent";

export default function NotFound() {
	return (
		<ErrorComponent
			code="404"
			title="Page not found"
			description="We couldn’t find the page you’re looking for."
			suggestions={[
				"Check the URL for typos.",
				"Use the site navigation to find what you need.",
				"Go back to the homepage.",
			]}
		/>
	);
}
