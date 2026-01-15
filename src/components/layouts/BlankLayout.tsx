// React Imports
import React from "react";

export default function BlankLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section id="blank-layout">
			<main>{children}</main>
		</section>
	);
}
