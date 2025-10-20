// Components
import ErrorComponent from "@/components/features/errors/ErrorComponent";

export default function Unauthorized() {
	return (
		<ErrorComponent
			code="401"
			title="Unauthorized"
			description="You need to sign in to view this page."
			suggestions={[
				"Sign in to your account and try again.",
				"If you don’t have an account, create one.",
				"If you think this is a mistake, contact support.",
			]}
		/>
	);
}
