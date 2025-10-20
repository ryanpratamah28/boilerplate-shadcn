// React
import React from "react";

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
								<BreadcrumbLink href="#">
									components
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden md:block" />

							<BreadcrumbItem className="hidden md:block">
								<BreadcrumbLink href="#">ui</BreadcrumbLink>
							</BreadcrumbItem>

							<BreadcrumbSeparator className="hidden md:block" />

							<BreadcrumbItem>
								<BreadcrumbPage>button.tsx</BreadcrumbPage>
							</BreadcrumbItem>
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
