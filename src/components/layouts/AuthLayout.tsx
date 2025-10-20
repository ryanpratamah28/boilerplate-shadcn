import React from "react";

// Components
import Header from "@/components/features/shared/Header";

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section id="auth-layout">
			<Header />
			<main>{children}</main>
		</section>
	);
}
