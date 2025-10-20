import React from "react";

// Components
import Header from "@/components/features/shared/Header";
import Navbar from "../features/shared/Navbar";
import Footer from "@/components/features/shared/Footer";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section id="root-layout">
			<Header />
			<Navbar />

			<main>{children}</main>

			<Footer />
		</section>
	);
}
