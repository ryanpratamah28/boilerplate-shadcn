// Routing
import { Link, useRouter } from "@tanstack/react-router";

// ShadCN UI Components
import { Button } from "@/components/ui/button";

type ErrorPageProps = {
	code: string;
	title: string;
	description: string;
	suggestions: string[];
};

export default function ErrorComponent(ErrorPageProps: ErrorPageProps) {
	const { history } = useRouter();
	const { code, title, description, suggestions } = ErrorPageProps;

	return (
		<section id="error-layout">
			<main className="min-h-dvh flex items-center justify-center px-6 py-16">
				<section
					aria-labelledby="error-title"
					className="w-full max-w-xl text-center"
				>
					<p
						className="text-5xl font-extrabold"
						aria-label="Error code"
					>
						{code}
					</p>
					<h1
						id="error-title"
						className="mt-2 text-3xl font-semibold tracking-tight text-balance"
					>
						{title}
					</h1>
					<p className="mt-3 text-base text-muted-foreground">
						{description}
					</p>

					{suggestions.length > 0 ? (
						<ul
							className="mt-6 mx-auto w-fit text-left text-sm text-muted-foreground space-y-2"
							aria-label="Suggested next steps"
						>
							{suggestions.map((hint, i) => (
								<li key={i} className="leading-6">
									• {hint}
								</li>
							))}
						</ul>
					) : null}

					<div className="flex justify-center gap-4 mt-8">
						<Button
							size="lg"
							variant="outline"
							className="px-6"
							onClick={() => history.go(-1)}
						>
							Go Back
						</Button>

						<Link to="/" aria-label="Back to Home">
							<Button
								size="lg"
								variant="default"
								className="px-6"
							>
								Back to Home
							</Button>
						</Link>
					</div>
				</section>
			</main>
		</section>
	);
}
