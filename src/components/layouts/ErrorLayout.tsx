import React from "react";

export default function ErrorLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section id="error-layout">
			<main>{children}</main>
		</section>
	);
}
