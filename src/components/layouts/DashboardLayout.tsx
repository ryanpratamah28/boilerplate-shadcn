// React
import React from "react";

// Routing
import { Link, useLocation } from "@tanstack/react-router";

// ShadCN UI Components
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

// Components
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
	children,
}: {
	children?: React.ReactNode;
}) {
	const location = useLocation();
	const pathnames = location.pathname.split("/").filter((x) => x);

	return (
		<SidebarProvider>
			<Sidebar />

			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
					<SidebarTrigger className="-ml-1" />

					<Separator
						orientation="vertical"
						className="mr-2 data-[orientation=vertical]:h-4"
					/>

					<Breadcrumb>
						<BreadcrumbList>
							<BreadcrumbItem className="hidden md:block">
								{pathnames.length === 0 ||
								(pathnames.length === 1 &&
									pathnames[0] === "admin") ? (
									<BreadcrumbPage>Admin</BreadcrumbPage>
								) : (
									<BreadcrumbLink asChild>
										<Link to="/admin">Admin</Link>
									</BreadcrumbLink>
								)}
							</BreadcrumbItem>

							{pathnames.map((segment, index) => {
								if (segment === "admin" && index === 0)
									return null;

								const isLast = index === pathnames.length - 1;
								const to = `/${pathnames.slice(0, index + 1).join("/")}`;
								const title = segment.replace(/-/g, " ");

								return (
									<React.Fragment key={to}>
										<BreadcrumbSeparator className="hidden md:block" />
										<BreadcrumbItem
											className={
												isLast ? "" : "hidden md:block"
											}
										>
											{isLast ? (
												<BreadcrumbPage className="capitalize">
													{title}
												</BreadcrumbPage>
											) : (
												<BreadcrumbLink asChild>
													<Link
														to={to as any}
														className="capitalize"
													>
														{title}
													</Link>
												</BreadcrumbLink>
											)}
										</BreadcrumbItem>
									</React.Fragment>
								);
							})}
						</BreadcrumbList>
					</Breadcrumb>
				</header>

				<main className="flex flex-1 gap-4 p-4 overflow-hidden">
					{children}
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
